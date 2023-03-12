import sys
from itertools import chain

sys.path.append("../..")

import os
import signal
from warnings import warn

from flask import Flask, flash, json, redirect, request, url_for
from p4.config.v1 import p4info_pb2
from werkzeug.utils import secure_filename

from network.build_environment import Runner
from network.p4_host import P4Host
from network.p4runtime_switch import P4RuntimeSwitch
from p4runtime_lib import bmv2, helper

app = Flask(__name__)
UPLOAD_FOLDER = "./uploads/"
COMPILATION_FOLDER = "./compiles/"

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['COMPILATION_FOLDER'] = COMPILATION_FOLDER

ALLOWED_EXTENSIONS = {'p4'}

# <Utils #
def allowed_file(filename):
    """ Utility function to check if file is of allowed extension
    
        Attributes:
            - filename      : string        // File name
    """
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
# Utils> #

@app.route('/')
def index():
    return 'Welcome to controller api'

# TBT
@app.route('/api/files/upload', methods=['POST'])
def upload_file():
    try:
        if request.method == 'POST':
            # check if the post request has the file part
            if 'file' not in request.files:
                flash('No file part')
                return redirect(request.url)
            file = request.files['file']
            # If the user does not select a file, the browser submits an
            # empty file without a filename.
            if file.filename == '':
                flash('No selected file')
                return redirect(request.url)
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                return redirect(url_for('download_file', name=filename))
    except Exception as e:
        warn("upload_file(): " + str(e))
        return e, 500
    return '', 200

# TBT
@app.route('/api/files', methods=['GET'])
def get_files():
    try:
        return [UPLOAD_FOLDER+file_name for file_name in os.listdir(UPLOAD_FOLDER)], 200
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

        conn = bmv2.Bmv2SwitchConnection(name=name,
                                        address=addr,
                                        device_id=device_id,
                                        proto_dump_file=f"{proto_dump}{device_id}.txt")

        app.config['SWS_CONNECTIONS'].append(conn)
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
            conn = bmv2.Bmv2SwitchConnection(name=sw.name,
                                            address=f"0.0.0.0:{sw.grpc_port}",
                                            device_id=sw.device_id,
                                            proto_dump_file=f"{proto_dump}{sw.device_id}.txt")

            app.config['SWS_CONNECTIONS'].append(conn)
    except Exception as e:
        warn("connect_to_all_switches(): " + str(e))
        return e, 500
    return '', 200

# TBT
@app.route('/api/switch/program', methods=['POST'])
def program_switch():
    """ Program bmv2 switch.

        Attributes:
            - p4file        : string    // P4 file path with which to compile the switch
            - device_id     : string    // Bmv2Switch to program (if equal to @ all switchs are programmed)
    """
    device_id = (int)(request.form['device_id'])
    p4file = request.form['p4file']
    
    try:
        if not os.path.isfile(os.path.join(UPLOAD_FOLDER, p4file)):
            return 'File does not exist', 400
        
        p4info, p4json = _compile_p4(p4file)

        sw_conns = app.config['SWS_CONNECTIONS']
        if device_id != '@':
            sw_conns = list(filter(lambda sw: sw.device_id == device_id, app.config['SWS_CONNECTIONS']))

  
        for sw_conn in sw_conns:
            sw_conn.p4info = p4info
            p4info_helper = helper.P4InfoHelper(sw_conn.p4info)
            sw_conn.MasterArbitrationUpdate()
            sw_conn.SetForwardingPipelineConfig(p4info=p4info_helper.p4info,
                                                bmv2_json_file_path=p4json)     
        
    except Exception as e:
        warn(f"program_switch: {str(e)}")
        return e, 500

    return '', 200

# TBT
def _compile_p4(p4file):
    try:
        org = os.path.join(UPLOAD_FOLDER, p4file)
        dst = os.path.join(COMPILATION_FOLDER, p4file)
        
        command = f"p4c --target bmv2 --arch v1model --p4runtime-files {dst} --std {org}"
        os.system(command)
        
        p4info = dst + ".p4info.txt"
        p4json = dst + ".json"
        
    except Exception as e:
        warn(f'Compilation failed ! cause: {e}')
        return None, None
        
    return p4info, p4json

# TBT
@app.route('/api/switch/inserttable', methods=['POST'])
def insert_table():
    """ Program bmv2 switch.

        Attributes:
            - device_id         : string    // Bmv2Switch to program (if equal to @ all switchs are programmed)
            - table             : string    // Table name
            - match             : string    // Matching packet field
            - action_name       : string    // Name of the action
            - default_action    : string    // Default action of the table
            - action_params     : string    // Action parameters
            - priority          : string    // Action priority
    """
    device_id = (int)(request.form['device_id'])

    sw_conns = app.config['SWS_CONNECTIONS']
    if device_id != '@':
        sw_conns = list(filter(lambda sw_conn: sw_conn.device_id == device_id, app.config['SWS_CONNECTIONS']))

    try:
        for sw_conn in sw_conns:
            p4info_helper = helper.P4InfoHelper(sw_conn.p4info)
            if _validateTableEntry(request.form, p4info_helper):   
                table_name = request.form['table']
                match_fields = request.form['match']
                action_name = request.form['action_name']
                default_action = request.form['default_action']
                action_params = request.form['action_params']
                priority = request.form['priority']

                table_entry = p4info_helper.buildTableEntry(
                    table_name=table_name,
                    match_fields=match_fields,
                    default_action=(bool)(default_action),
                    action_name=action_name,
                    action_params=action_params,
                    priority=priority)

                sw_conn.WriteTableEntry(table_entry)
        return '', 200
    except:
        warn("Failed configuration")
        return '', 500

def _validateTableEntry(table_fields, p4info_helper):
    table_name = table_fields['table']
    match_fields = table_fields.get('match')  # None if not found
    priority = table_fields.get('priority')  # None if not found
    match_types_with_priority = [
        p4info_pb2.MatchField.TERNARY,
        p4info_pb2.MatchField.RANGE
    ]
    if match_fields is not None and (priority is None or priority == 0):
        for match_field_name, _ in match_fields.items():
            p4info_match = p4info_helper.get_match_field(
                table_name, match_field_name)
            match_type = p4info_match.match_type
            if match_type in match_types_with_priority:
                warn("non-zero 'priority' field is required")
                return False
    return True

# Fail safe for testing so it shutsdown the 
# Mininet topology when stoping execution
def SignalHandler_SIGINT(SignalNumber, Frame):
    app.config['ENVIRONMENT'].net.stop()
    os.system('mn -c') 
signal.signal(signal.SIGINT, SignalHandler_SIGINT)

app.run(host='0.0.0.0', port=6000)