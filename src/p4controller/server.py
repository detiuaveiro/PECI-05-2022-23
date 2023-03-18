import sys
import atexit
from itertools import chain

sys.path.append("..")

import os
import re
import signal
from warnings import warn

from flask import Flask, flash, json, redirect, request, url_for
from p4.config.v1 import p4info_pb2
from werkzeug.utils import secure_filename

from network.build_environment import Runner
from network.p4_host import P4Host
from network.p4runtime_switch import P4RuntimeSwitch
from p4runtime_lib import bmv2, helper, convert


app = Flask(__name__)

UPLOAD_FOLDER = "./uploads/"
COMPILATION_FOLDER = "./compiles/"

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['COMPILATION_FOLDER'] = COMPILATION_FOLDER
app.config['SWS_CONNECTIONS'] = []

ALLOWED_EXTENSIONS = {'p4'}

# <Utils #
def _allowed_file(filename):
    """ Utility function to check if file is of allowed extension
    
        Attributes:
            - filename      : string        // File name
    """
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def _get_switch_conns(device_id):
    for sw_conn in app.config['SWS_CONNECTIONS']:
        if not device_id or sw_conn.device_id == int(device_id):
            yield sw_conn
# Utils> #

@app.route('/')
def index():
    return 'Welcome to controller api'

# PASSING
@app.route('/api/files/upload', methods=['POST'])
def upload_file():
    try:
        if request.method == 'POST':
            # check if the post request has the file part
            if 'file' not in request.files:
                flash('No file part')
                return redirect(request.url)
            
            if not os.path.isdir(app.config['UPLOAD_FOLDER']):
                os.system(f"mkdir {app.config['UPLOAD_FOLDER']}")
            
            file = request.files['file']
            # If the user does not select a file, the browser submits an
            # empty file without a filename.
            if file.filename == '':
                flash('No selected file')
                return redirect(request.url)
            if file and _allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            else:
                'File format not allowed', 400
    except Exception as e:
        warn("upload_file(): " + str(e))
        return e, 500
    return '', 200

# TBT
@app.route('/api/files', methods=['GET'])
def get_files():
    try:
        return [app.config['UPLOAD_FOLDER']+file_name for file_name in os.listdir(app.config['UPLOAD_FOLDER'])], 200
    except Exception as e:
        warn("get_files(): " + str(e))
        return e, 400
    
# TBT    
@app.route('/api/files/delete', methods=['DELETE'])
def delete_file():
    try:
        os.remove(request.form['file_path'])
        return '', 200
    except Exception as e:
        warn("delete_file(): " + str(e))
        return e, 400

# PASSING
@app.route('/api/deploy', methods=['POST'])
def deploy_network():
    """ Deploy the network
        
        Attributes:
            - topology     : string    // json describing the network topology
    """
    topology = request.form['topology']

    cwd = os.getcwd()
    app.config['ENVIRONMENT'] = Runner(json.loads(topology),
                                       os.path.join(cwd, 'logs'),
                                       os.path.join(cwd, 'pcaps'),
                                       os.path.join(cwd, 'dumps'),
                                       "simple_switch_grpc",
                                       False)

    try:
        app.config['ENVIRONMENT'].build_env()
        return '', 200
    except Exception as e:
        app.config['ENVIRONMENT'].net.stop()
        warn("deploy_network(): " + str(e))
        return e, 500
      
# PASSING  
@app.route('/api/devices', methods=['GET'])
def get_devices():
    """ Get all devices in the Mininet network

        Return:
            - device listing    : json      // json with all the devices id's and addresses
    """
    try:
        devices = {}
        
        for node in chain(app.config['ENVIRONMENT'].net.hosts,app.config['ENVIRONMENT'].net.switches):
            temp = {
                'name': node.name,
                'intfs': []
            }
            
            if isinstance(node, P4RuntimeSwitch):
                if not 'switches' in devices.keys():
                    devices['switches'] = []
                    
                for intfs in node.intfList():
                    if intfs.mac != None:
                        temp['intfs'].append({
                            'name': intfs.name,
                            'mac': intfs.mac,
                        }) 
                
                temp['device_id'] = node.device_id
                temp['grpc_port'] = node.grpc_port
                              
                devices['switches'].append(temp)
                
            elif isinstance(node, P4Host):
                if not 'hosts' in devices.keys():
                    devices['hosts'] = []
                
                for intfs in node.intfList():
                    temp['intfs'].append({
                        'name': intfs.name,
                        'mac': intfs.mac,
                        'ip&prefix': intfs.ip + "/" + str(intfs.prefixLen)
                    })
                
                devices['hosts'].append(temp)

        return json.dumps(devices), 200
    except Exception as e:
        warn("get_devices(): " + str(e))
        return e, 500
    
# PASSING
@app.route('/api/switch/connect', methods=['POST'])
def connect_to_switch():
    """ Connect to bmv2 switch.

        Attributes:
            - addr                : string    // bmv2 IP:PORT address
            - device_id           : string    // device id
            - proto_dump_fpath    : string    // File to dump logs
    """
    try:
        name = request.form['name']
        addr = request.form['address']
        device_id = (int)(request.form['device_id'])
        proto_dump = "./dumps/" + request.form['proto_dump']

        if all(map(lambda conn: conn.device_id != device_id, app.config['SWS_CONNECTIONS'])):
            conn = bmv2.Bmv2SwitchConnection(name=name,
                                            address=addr,
                                            device_id=device_id,
                                            proto_dump_file=f"{proto_dump}{device_id}.txt")
            app.config['SWS_CONNECTIONS'].append(conn)
        
        for sw_conn in app.config['SWS_CONNECTIONS']:
            print(f"Connected to {sw_conn.name} at {sw_conn.address}")
        
    except Exception as e:
        warn("connect_to_switch(): " + str(e))
        return e, 500
    
    return '', 200

# PASSING
@app.route('/api/switch/connectall', methods=['POST'])
def connect_to_all_switches():
    """ Connect to all bmv2 switches.

        Attributes:
            - proto_dump_fpath    : string    // File to dump logs
    """
    
    try:
        proto_dump = "./dumps/" + request.form['proto_dump']
        for sw in app.config['ENVIRONMENT'].net.switches:
            if all(map(lambda conn: conn.device_id != sw.device_id,app.config['SWS_CONNECTIONS'])): 
                conn = bmv2.Bmv2SwitchConnection(name=sw.name,
                                                address=f"0.0.0.0:{sw.grpc_port}",
                                                device_id=sw.device_id,
                                                proto_dump_file=f"{proto_dump}{sw.device_id}.txt")
                app.config['SWS_CONNECTIONS'].append(conn)
            
        for sw_conn in app.config['SWS_CONNECTIONS']:
            print(f"Connected to {sw_conn.name} at {sw_conn.address}")
            
    except Exception as e:
        warn("connect_to_all_switches(): " + str(e))
        return e, 500
    return '', 200

# PASSING
@app.route('/api/switch/program', methods=['POST'])
def program_switch():
    """ Program bmv2 switch.

        Attributes:
            - p4file        : string    // P4 file path with which to compile the switch
            - device_id     : string    // Bmv2Switch to program (will program all if not specified)
    
    """
    try:
        if not os.path.isfile(os.path.join(app.config['UPLOAD_FOLDER'], f"{request.form['p4file']}.p4")):
            return 'File does not exist', 400
        
        p4info, p4json = _compile_p4(request.form['p4file'])

        for sw_conn in _get_switch_conns(request.args.get('device_id', None)):
            sw_conn.p4info = p4info
            p4info_helper = helper.P4InfoHelper(sw_conn.p4info)
            sw_conn.MasterArbitrationUpdate()
            sw_conn.SetForwardingPipelineConfig(p4info=p4info_helper.p4info,
                                                bmv2_json_file_path=p4json)    
            
            print(f"{sw_conn.name} programmed") 
        
    except Exception as e:
        warn(f"program_switch(): {e}")
        return e, 500

    return '', 200

# PASSING
def _compile_p4(p4file):
    try:
        if not os.path.isdir(app.config['COMPILATION_FOLDER']):
                os.system(f"mkdir {app.config['COMPILATION_FOLDER']}")
                
        org = os.path.join(app.config['UPLOAD_FOLDER'], f"{p4file}.p4")
        dst = os.path.join(app.config['COMPILATION_FOLDER'], f"{p4file}.p4info.txt")
        
        command = f"p4c --target bmv2 --arch v1model -o {app.config['COMPILATION_FOLDER']} --p4runtime-files {dst} --std p4-16 {org}"
        os.system(command)
        
        p4info = os.path.join(app.config['COMPILATION_FOLDER'], f"{p4file}.p4info.txt")
        p4json = os.path.join(app.config['COMPILATION_FOLDER'], f"{p4file}.json")
    except Exception as e:
        raise Exception(f'Compilation failed: {e}')
        
    return p4info, p4json

# PASSING
@app.route('/api/switch/inserttable', methods=['POST'])
def insert_table():
    """ Program bmv2 switch.

        Attributes:
            - device_id         : string    // Bmv2Switch where to inser the table entry (will insert on switches all if not specified)
            - table             : string    // Table name
            - match             : string    // Matching packet field
            - action_name       : string    // Name of the action
            - default_action    : string    // Default action of the table
            - action_params     : string    // Action parameters
            - priority          : string    // Action priority
    """
    try:
        for sw_conn in _get_switch_conns(request.form.get('device_id', None)):
            p4info_helper = helper.P4InfoHelper(sw_conn.p4info)
            
            match_fields=request.form.get('match',None)
            if match_fields is not None:
                match_fields = json.loads(match_fields)
                for key, value in match_fields.items():
                    match = re.match(r"\('(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})',(\d{1,2})\)",value)
                    if match:
                        match_fields[key]=(str(match.group(1)),int(match.group(2)))
                
            action_params= request.form.get('action_params', None)
            if action_params is not None:
                action_params = json.loads(action_params)
                
            table_entry = p4info_helper.buildTableEntry(
                table_name=request.form['table'],
                match_fields=match_fields,
                default_action=(bool)(request.form.get('default_action', False)),
                action_name=request.form.get('action_name',None),
                action_params=action_params,
                priority=request.form.get('priority', None))

            sw_conn.WriteTableEntry(table_entry)
            
            print(f"Table inserted at {sw_conn.name}")
            
        return '', 200
    except Exception as e:
        warn(f"Failed configuration: {e}")
        return '', 500

# PASSING
@app.route('/api/switch/gettable', methods=['GET'])
def get_table_entries():
    """ Retrieve bmv2 switch table entries
    
        Attributes:
            - device_id         : number    // Bmv2Switch to program (will return all if not specified)
            - table_id          : number    // Table from which to return entries
            - table_name        : string    // Table from which to return entries (used instead of table_id)
    """
    table_entries = {}
    try:
        for sw_conn in _get_switch_conns(request.args.get('device_id', None)):
            p4info_helper = helper.P4InfoHelper(sw_conn.p4info)
            
            table_id = request.args.get('table_id', None)
            table_name = request.args.get('table_name', None)
            
            if table_id is None and table_name is not None:
                table_id = p4info_helper.get_tables_id(table_name)
                
            for table in getattr(p4info_helper.p4info, "tables"):
                pre = table.preamble
                if pre.id == table_id or table_id is None:
                    if not sw_conn.name in table_entries.keys():
                        table_entries[sw_conn.name] = []
                    
                    for response in sw_conn.ReadTableEntries(table_id=pre.id):
                        for entity in response.entities:
                            table_entry = entity.table_entry
                            table_entries[sw_conn.name].append({
                                "table_id": table_entry.table_id,
                                "matches": [x for x in _get_field_matches(table_entry.match)],
                                "action": _get_action(table_entry.action),
                                "priority": table_entry.priority,
                                "meter_config": {
                                        "cir": table_entry.meter_config.cir,
                                        "cburst": table_entry.meter_config.cburst,
                                        "pir": table_entry.meter_config.pir,
                                        "pburst": table_entry.meter_config.pburst
                                    },
                                "counter_data" : {
                                        "byte_count": table_entry.counter_data.byte_count,
                                        "packet_count": table_entry.counter_data.packet_count
                                    },
                                "is_default_action": table_entry.is_default_action,
                                "idle_timeout_ns": table_entry.idle_timeout_ns,
                                "time_since_last_hit": table_entry.time_since_last_hit.elapsed_ns
                            })
                            
        print(table_entries) 
        return json.dumps(table_entries), 200
    
    except Exception as e:
        warn(f"Failed to get table entry: {e}")
        return '', 500

def _get_field_matches(matches_entry):
    for fldm in matches_entry:
        mtch = {}
        mtch["field_id"] = fldm.field_id
        if len(repr(fldm.lpm)):
            mtch["lpm"] = {
                "value": convert.decodeIPv4(fldm.lpm.value),
                "prefix_len": fldm.lpm.prefix_len
            }
        elif len(repr(fldm.exact)):
            mtch["exact"] = {
                "value": convert.decodeIPv4(fldm.exact.value)
            }
        elif len(repr(fldm.ternary)):
            mtch["ternary"] = {
                "value":  convert.decodeIPv4(fldm.ternary.value),
                "mask": convert.decodeIPv4(fldm.ternary.mask)
            }
        elif len(repr(fldm.range)):
            mtch["range"] = {
                "low":  convert.decodeIPv4(fldm.range.low),
                "high":  convert.decodeIPv4(fldm.range.high)
            }
        elif len(repr(fldm.optional)):
            mtch["exact"] = {
                "value": fldm.optional.value
            }
            
        yield mtch

def _get_action(table_action):
    if len(repr(table_action.action)):
        return {
            "action_id": table_action.action.action_id,
            "params":[{
                    "param_id": x.param_id,
                    "value": convert.decodeNum(x.value)
                } for x in table_action.action.params]
        }
    elif table_action.action_profile_member_id:
        return {
            "action_profile_member_id": table_action.action_profile_member_id
        }
    elif len(repr(table_action.action_profile_group_id)):
        return {
            "action_profile_group_id": table_action.action_profile_group_id
        }
    elif len(repr(table_action.action_profile_action_set)):
        return {
            "action_profile_action_set": {
                "action_profile_actions": [{
                    "action": {
                            "action_id": x.action.action_id,
                            "params": [{
                                    "param_id": y.param_id,
                                    "value": convert.decodeNum(y.value)
                                } for y in x.action.params]
                        },
                    "weight": x.weight,
                    "watch_port": x.watch_port
                } for x in table_action.action_profile_action_set.action_profile_actions]
            }
        }
    
# TBT
@app.route('/api/switch/getcounters', methods=['GET'])
def get_counters():
    """ Retrieve bmv2 switch table entries
    
        Attributes:
            - device_id         : number    // Bmv2Switch to program (will return counter for all switches all if not specified)
            - counter_name      : string    // Counter name
            - index             : number    // Index associated with the counter
            
        Attention:
            - For simplicity sake, you should configure you're counter indexes to be the match key in each table entry, that why you can always reference your counter index by the respective table entry match key
    """
    try:        
        for sw_conn in _get_switch_conns(request.args.get('device_id', None)):
            p4info_helper = helper.P4InfoHelper(sw_conn.p4info)
            
            counter_id = p4info_helper.get_counters_id(request.args['counter_name']) if 'counter_name' in request.args.keys() else None
            
            index = int(request.args['index']) if 'index' in request.args.keys() else 0
            
            for response in sw_conn.ReadCounters(counter_id, index):
                print(response.entities)
                for entity in response.entities:
                    counter = entity.counter_entry
                    print("%s %s %d: %d packets (%d bytes)" % (
                        sw_conn.name, request.args.get('counter_name', None), counter.index.index,
                        counter.data.packet_count, counter.data.byte_count
                    ))
                    
            # FIXME - Need to get all indexes if 0, now is returning empty
                    
        return '', 200
    
    except Exception as e:
        warn(f"Failed to get counters: {e}")
        return '', 500    
    
    
# ATTENTION - Shutting Mininet down before exiting
def exit_handler(*args):
    app.config['ENVIRONMENT'].net.stop()
    os.system('sudo mn -c && sudo rm -r compiles uploads') 
atexit.register(exit_handler)
signal.signal(signal.SIGTERM, exit_handler)
signal.signal(signal.SIGINT, exit_handler)

app.run(host='0.0.0.0', port=6000)