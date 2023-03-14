import sys
from itertools import chain

sys.path.append("../..")

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
from p4runtime_lib import bmv2, helper

app = Flask(__name__)
app.secret_key = "super secret key"

UPLOAD_FOLDER = "./uploads/"
COMPILATION_FOLDER = "./compiles/"

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['COMPILATION_FOLDER'] = COMPILATION_FOLDER
app.config['SWS_CONNECTIONS'] = []

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
            if file and allowed_file(file.filename):
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
            - device_id     : string    // Bmv2Switch to program (if equal to @ all switchs are programmed)
    
    """
    sw_conns = app.config['SWS_CONNECTIONS']
    
    if 'device_id' in request.form:
        device_id = (int)(request.form['device_id'])
        sw_conns = list(filter(lambda sw: sw.device_id == device_id, app.config['SWS_CONNECTIONS']))
    
    try:
        if not os.path.isfile(os.path.join(app.config['UPLOAD_FOLDER'], f"{request.form['p4file']}.p4")):
            return 'File does not exist', 400
        
        p4info, p4json = _compile_p4(request.form['p4file'])

        for sw_conn in sw_conns:
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

# FAILLING
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
    sw_conns = app.config['SWS_CONNECTIONS']
    if 'device_id' in request.form:
        device_id = (int)(request.form['device_id'])
        sw_conns = list(filter(lambda sw_conn: sw_conn.device_id == device_id, app.config['SWS_CONNECTIONS']))

    #try:
    for sw_conn in sw_conns:
        p4info_helper = helper.P4InfoHelper(sw_conn.p4info)
        
        match_fields=request.form.get('match',None)
        if match_fields != None:
            match_fields = json.loads(match_fields)
            for key, value in match_fields.items():
                match = re.match(r"\('(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})',(\d{1,2})\)",value)
                if match:
                    match_fields[key]=(match.group(1),int(match.group(2)))
            
        action_params= request.form.get('action_params', None)
        if action_params != None:
            action_params = json.loads(action_params)
            
        table_entry = p4info_helper.buildTableEntry(
            table_name=request.form['table'],
            match_fields=match_fields,
            default_action=(bool)(request.form.get('default_action', False)),
            action_name=request.form.get('action_name',None),
            action_params=action_params,
            priority=request.form.get('priority', None))

        sw_conn.WriteTableEntry(table_entry)
    return '', 200
    #except Exception as e:
    #    warn(f"Failed configuration: {e}")
    #    return '', 500

# Fail safe for testing so it shutsdown the 
# Mininet topology when stoping execution
def SignalHandler_SIGINT(SignalNumber, Frame):
    app.config['ENVIRONMENT'].net.stop()
    os.system('mn -c && rm -r compiles uploads') 
    
signal.signal(signal.SIGINT, SignalHandler_SIGINT)

app.run(host='0.0.0.0', port=6000)