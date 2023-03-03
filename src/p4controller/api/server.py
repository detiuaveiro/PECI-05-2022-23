from network.p4runtime_switch import P4RuntimeSwitch
from p4runtime_lib import bmv2
from p4runtime_lib import helper
from p4.config.v1 import p4info_pb2
from network.build_environment import Runner
from flask import Flask, json, flash, request, redirect, url_for
import os
import sys
import uuid
import warnings

sys.path.append("../..")

env = None                  # Environment variable containing the Mininet network instance
switch_connections = []     # List of all switch Bmv2SwitchConnection

app = Flask(__name__)
UPLOAD_FOLDER = "./saves/"
COMPILATION_FOLDER = "./compiles/"
ALLOWED_EXTENSIONS = {'p4'}


@app.route('/')
def index():
    return 'Welcome to controller api'


@app.route('/api/files/upload', methods=['POST'])
def upload_load():
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and file.filename:
        filename = str(uuid.uuid4()) + file.filename
        file.save(os.path.join(UPLOAD_FOLDER, filename))
        return os.path.join(UPLOAD_FOLDER, filename), 200
    return 'Unvalid File', 400


@app.route('/api/files', methods=['GET'])
def get_files():
    return [UPLOAD_FOLDER+file_name for file_name in os.listdir(UPLOAD_FOLDER)], 200


@app.route('/api/files/delete', methods=['DELETE'])
def delete_file():
    try:
        os.remove(request.form['file_path'])
        return '', 200
    except:
        return 'Error deleting file', 400


# TBT
@app.route('/api/deploy', methods=['POST'])
def deploy_network():
    """ Deploy the network
        
        Attributes:
            - topology_json     : string    // json describing the network topology
    """
    topology = request.form['topology_json']

    cwd = os.getcwd()
    env = Runner(topology,
                 os.path.join(cwd, 'logs'),
                 os.path.join(cwd, 'pcaps'),
                 "simple_switch_grpc",
                 False)

    # return result
    return '', 200 if env.build_env() else 500

# TBT
@app.route('/api/switch/connect', methods=['POST'])
def connect_to_switch():
    """ Connect to bmv2 switch.

        Attributes:
            - addr                : string    // bmv2 IP:PORT address
            - device_id           : string    // device id
            - proto_dump_fpath    : string    // File to dump logs
    """
    name = request.form['name']
    addr = request.form['address']
    device_id = (int)(request.form['device_id'])
    proto_dump = request.form['proto_dump']

    conn = bmv2.Bmv2SwitchConnection(name=name,
                                     address=addr,
                                     device_id=device_id,
                                     proto_dump_file=proto_dump)

    switch_connections.append(conn)
    
    return '', 200

# TBT
@app.route('/api/switch/connectall', methods=['POST'])
def connect_to_all_switches():
    """ Connect to all bmv2 switches.

        Attributes:
            - proto_dump_fpath    : string    // File to dump logs
    """

    proto_dump = request.form['proto_dump']
    for sw in env.net.switches:
        conn = bmv2.Bmv2SwitchConnection(name=sw.name,
                                         address=f"0.0.0.0:{sw.grpc_port}",
                                         device_id=sw.device_id,
                                         proto_dump_file=f"{proto_dump}+{sw.device_id}")

        switch_connections.append(conn)
        
    return '', 200

# TBT
@app.route('/api/switch/program', methods=['POST'])
def program_switch():
    """ Program bmv2 switch.

        Attributes:
            - p4file        : string    // P4 file path with which to compile the switch
            - device_id     : string    // Bmv2Switch to program
    """
    device_id = (int)(request.form['device_id'])
    p4file = request.form['p4file']
    
    # ATTENTION - P4 file must already have been uploaded
    # FIXME - Add validation for p4 file existence
    # FEATURE - Upload p4 file at same time
    
    p4info, p4json = _compile_p4(p4file)

    sw_conns = switch_connections
    if device_id != '@':
        sw_conns = list(filter(lambda sw: sw.device_id == device_id, switch_connections))

    try:
        for sw_conn in sw_conns:
            sw_conn.p4info = p4info
            p4info_helper = helper.P4InfoHelper(sw_conn.p4info)
            sw_conn.MasterArbitrationUpdate()
            sw_conn.SetForwardingPipelineConfig(p4info=p4info_helper.p4info,
                                                bmv2_json_file_path=p4json)
        return '', 200
    except:
        warnings.warn("Failed configuration")
        return '', 500

# TBT
def _compile_p4(p4file):
    org = os.path.join(UPLOAD_FOLDER, p4file)
    dst = os.path.join(COMPILATION_FOLDER, p4file)
    
    command = f"p4c --target bmv2 --arch v1model --p4runtime-files {dst} --std {org}"
    os.system(command)
    
    p4info = dst + ".p4info.txt"
    p4json = dst + ".json"
    
    return p4info, p4json
device_id = (int)(request.form['device_id'])
# TBT
@app.route('/api/switch/inserttable', methods=['POST'])
def insert_table():
    """ Program bmv2 switch.

        Attributes:
            - device_id         : string    // Bmv2Switch to program
            - table             : string    // Table name
            - match             : string    // Matching packet field
            - action_name       : string    // Name of the action
            - default_action    : string    // Default action of the table
            - action_params     : string    // Action parameters
            - priority          : string    // Action priority
    """
    device_id = (int)(request.form['device_id'])

    sw_conns = switch_connections
    if device_id != '@':
        sw_conns = list(filter(lambda sw_conn: sw_conn.device_id == device_id, switch_connections))

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
        warnings.warn("Failed configuration")
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
                warnings.warn("non-zero 'priority' field is required")
                return False
    return True


app.run(host='0.0.0.0', port=6000)
