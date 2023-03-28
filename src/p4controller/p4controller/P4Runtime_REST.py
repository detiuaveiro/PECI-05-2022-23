import sys
import atexit
from itertools import chain

sys.path.append("..")

import os
import re
import signal
from warnings import warn

from flask import Flask, flash, json, redirect, request
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

def _get_switch_conns(device_id, programmed=None):
    """Get established connections with BMV2 Switches

    Args:
        device_id (integer): BMV2 Switch id
        programmed (bo0lean, optional): False to return non programmed devices, true for programmed devices, None for all devices. Defaults to None.

    Yields:
        SwitchConnection: BMV2 Switch connection object
    """
    for sw_conn in app.config['SWS_CONNECTIONS']:
        if programmed == None or (programmed and sw_conn.GetForwardingPipelineConfig()) or (not programmed and not sw_conn.GetForwardingPipelineConfig()): 
            if not device_id or sw_conn.device_id == int(device_id):
                yield sw_conn    
# Utils> #

@app.route('/')
def index():
    return 'Welcome to controller api'

# PASSING
@app.route('/p4runtime/files/upload', methods=['POST'])
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
@app.route('/p4runtime/files', methods=['GET'])
def get_files():
    try:
        return [app.config['UPLOAD_FOLDER']+file_name for file_name in os.listdir(app.config['UPLOAD_FOLDER'])], 200
    except Exception as e:
        warn("get_files(): " + str(e))
        return e, 400
    
# TBT    
@app.route('/p4runtime/files/delete', methods=['DELETE'])
def delete_file():
    try:
        os.remove(request.form['file_path'])
        return '', 200
    except Exception as e:
        warn("delete_file(): " + str(e))
        return e, 400
  
# PASSING
@app.route('/p4runtime/connect', methods=['POST'])
def connect_to_switch():
    """ Connect to bmv2 switch.
    
        Endpoint:
            - /p4runtime/connect

        Attributes:
            - addr                : string    // bmv2 IP:PORT address
            - device_id           : string    // device id
            - proto_dump_fpath    : string    // File to dump logs
            - programmed          : bolean    // If BMV2 switch is already configured
    """
    name = request.form['name']
    addr = request.form['address']
    device_id = (int)(request.form['device_id'])
    
    if not os.path.isdir("./dumps/"):
            os.system(f"mkdir ./dumps/")
    
    proto_dump = "./dumps/" + request.form['proto_dump']
    if all(map(lambda conn: conn.device_id != device_id, app.config['SWS_CONNECTIONS'])):
        conn = bmv2.Bmv2SwitchConnection(name=name,
                                        address=addr,
                                        device_id=device_id,
                                        proto_dump_file=f"{proto_dump}{device_id}.txt")
        conn.MasterArbitrationUpdate()
        app.config['SWS_CONNECTIONS'].append(conn)
    
    for sw_conn in app.config['SWS_CONNECTIONS']:
        print(f"Connected to {sw_conn.name} at {sw_conn.address}")
    
    return '', 200

# PASSING
@app.route('/p4runtime/program', methods=['POST'])
def program_switch():
    """ Program bmv2 switch.

        Endpoint:
            - /p4runtime/program

        Attributes:
            - p4file        : string    // P4 file path with which to compile the switch
            - device_id     : string    // Bmv2Switch to program (will program all if not specified)
    
    """
    if not os.path.isfile(os.path.join(app.config['UPLOAD_FOLDER'], f"{request.form['p4file']}.p4")):
        return 'File does not exist', 400
    
    p4info_path, p4json = _compile_p4(request.form['p4file'])

    for sw_conn in _get_switch_conns(request.args.get('device_id', None)):
        p4info_helper = helper.P4InfoHelper(p4info_path)
        sw_conn.SetForwardingPipelineConfig(p4info=p4info_helper.p4info,
                                            bmv2_json_file_path=p4json)
        
        print(f"{sw_conn.name} programmed") 
    return '', 200

# PASSING
def _compile_p4(p4file):
    if not os.path.isdir(app.config['COMPILATION_FOLDER']):
            os.system(f"mkdir {app.config['COMPILATION_FOLDER']}")
            
    org = os.path.join(app.config['UPLOAD_FOLDER'], f"{p4file}.p4")
    dst = os.path.join(app.config['COMPILATION_FOLDER'], f"{p4file}.p4info.txt")
    
    command = f"p4c --target bmv2 --arch v1model -o {app.config['COMPILATION_FOLDER']} --p4runtime-files {dst} --std p4-16 {org}"
    os.system(command)
    
    p4info = os.path.join(app.config['COMPILATION_FOLDER'], f"{p4file}.p4info.txt")
    p4json = os.path.join(app.config['COMPILATION_FOLDER'], f"{p4file}.json")
        
    return p4info, p4json

# PASSING
@app.route('/p4runtime/inserttable', methods=['POST'])
def insert_table():
    """ Program bmv2 switch.

        Endpoint:
            - /p4runtime/inserttable

        Attributes:
            - device_id         : string    // Bmv2Switch where to inser the table entry (will insert on switches all if not specified)
            - table             : string    // Table name
            - match             : string    // Matching packet field
            - action_name       : string    // Name of the action
            - default_action    : string    // Default action of the table
            - action_params     : string    // Action parameters
            - priority          : string    // Action priority
    """
    for sw_conn in _get_switch_conns(request.form.get('device_id', None)):
        p4info_helper = helper.P4InfoHelper(sw_conn.GetForwardingPipelineConfig())
        
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
# PASSING
@app.route('/p4runtime/gettable', methods=['GET'])
def get_table_entries():
    """ Retrieve bmv2 switch table entries
    
        Endpoint:
            - /p4runtime/gettable
    
        Attributes:
            - device_id         : number    // Bmv2Switch to program (will return all if not specified)
            - table_id          : number    // Table from which to return entries
            - table_name        : string    // Table from which to return entries (used instead of table_id)
    """
    table_entries = {}
    for sw_conn in _get_switch_conns(request.args.get('device_id', None), programmed=True):
        p4info_helper = helper.P4InfoHelper(sw_conn.GetForwardingPipelineConfig())
        print(sw_conn.name)
        
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
                            "table_name": pre.name,
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
    
# PASSING
@app.route('/p4runtime/getcounters', methods=['GET'])
def get_counters():
    """ Retrieve bmv2 switch table entries
    
        Endpoint:
            - /p4runtime/getcounters
    
        Attributes:
            - device_id         : number    // Bmv2Switch to program (will return counter for all switches all if not specified)
            - counter_name      : string    // Counter name
            - index             : number    // Index associated with the counter
            
        Attention:
            - For simplicity sake, you should configure you're counter indexes to be the match key in each table entry, that why you can always reference your counter index by the respective table entry match key
    """
    device_id = request.args.get('device_id', None)
    counter_name = request.args.get('counter_name', None)
    index = int(request.args['index']) if 'index' in request.args.keys() else 0
        
    counter_entries = {}    
    for sw_conn in _get_switch_conns(device_id, programmed=True):
        print(sw_conn.name)
        p4info_helper = helper.P4InfoHelper(sw_conn.GetForwardingPipelineConfig())
        print()
        counter_entries[sw_conn.name] = {
            "device_id": sw_conn.device_id,
            "counters": []
        }
        for counter in p4info_helper.p4info.counters:
            if not counter_name or counter.preamble.name == counter_name:
                entries = []
                for response in sw_conn.ReadCounters(counter.preamble.id, index):
                    for entity in response.entities:
                        entries.append({
                            "index": str(entity.counter_entry.index.index),
                            "packet_count": str(entity.counter_entry.data.packet_count),
                            "byte_count": str(entity.counter_entry.data.byte_count)
                        })
                counter_entries[sw_conn.name]['counters'].append({
                    "id": counter.preamble.id,
                    "name": counter.preamble.name,
                    "entries" : entries
                })
    
    print(counter_entries)                
    
    return json.dumps(counter_entries), 200

    
# ATTENTION - Shutting Mininet down before exiting
def exit_handler(*args):
    clean()   
    exit()
    
def clean():
    if app.config.get('SWS_CONNECTIONS') != []:
        for sw_conn in app.config.get('SWS_CONNECTIONS'):
            sw_conn.shutdown()

    if app.debug:
        os.system('sudo rm -r compiles uploads')
        
atexit.register(exit_handler)
signal.signal(signal.SIGTERM, exit_handler)
signal.signal(signal.SIGINT, exit_handler)

clean()

if __name__ == '__main__':
    app.debug = False
    app.run(host='0.0.0.0', port=6000)