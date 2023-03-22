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

app = Flask(__name__)

# PASSING
@app.route('/mininet/deploy', methods=['POST'])
def deploy_network():
    """ Deploy the network
    
        Endpoint:
            - /mininet/deploy
        
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
@app.route('/mininet/devices', methods=['GET'])
def get_devices():
    """ Get all devices in the Mininet network

        Endpoint:
            - /mininet/devices

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
            
            for intfs in node.intfList():   
                if intfs.mac != None:
                    temp['intfs'].append({
                        'name': intfs.name,
                        'mac': intfs.mac,
                        'ip': '0.0.0.0' if not intfs.ip else intfs.ip,
                        'prefix': '0' if not intfs.prefixLen else intfs.prefixLen
                    }) 
            
            if isinstance(node, P4RuntimeSwitch):
                if not 'switches' in devices.keys():
                    devices['switches'] = []
                    
                temp['device_id'] = node.device_id
                temp['grpc_port'] = node.grpc_port
                              
                devices['switches'].append(temp)
                
            elif isinstance(node, P4Host):
                if not 'hosts' in devices.keys():
                    devices['hosts'] = []
                
                devices['hosts'].append(temp)

        return json.dumps(devices), 200
    except Exception as e:
        warn("get_devices(): " + str(e))
        return e, 500

# PASSING
@app.route('/mininet/net/control', methods=['POST'])
def mn_control():
    """ Call mininet network object attribute, can be a value or a function
    
        Endpoint:
            - /mininet/net/control
    
        Attributes:
            - attribute         : string    // Name of the method or attribute from Mininet object
    """
    try:
        func = getattr(app.config['ENVIRONMENT'].net, request.form.get('attribute', None))
        if callable(func):
            args = request.form.to_dict()
            if len(args) > 1:
                del args['attribute']
                r = func(**args)
                return str(r) if r else '', 200
            
            r = func()
            return str(r) if r else '', 200
        elif isinstance(func, list):
            return list(map(lambda m: str(m), func)), 200
        else:
            return str(func), 200
    except Exception as e:
        warn(f"Failed to run Mininet network method: {e}")
        return '', 404

# PASSING
@app.route('/mininet/node/command', methods=['POST'])
def sw_command():
    """ Execute command in a Mininet node
    
        Endpoint:
            - /mininet/node/command
    
        Attributes:
            - node_name          : string    // Name of the device
            - command            : string    // Command to be run on the device
            - verbose            : boolean   // If the endpoint is to return the stdout of the executed command
    """
    try:
        for name in iter(app.config['ENVIRONMENT'].net):
            node_name = request.form.get('node_name', None)
            if name == node_name or not node_name:
                node = app.config['ENVIRONMENT'].net.get(name)
                if request.form.get('verbose', None):
                    return str(node.cmdPrint(request.form['command'])), 200
                else:
                    node.sendCmd(request.form['command'])
                
        return '', 200
    except Exception as e:
        warn(f"Failed to run switch command: {e}")
        return '', 500

# PASSING
@app.route('/mininet/node/control', methods=['POST'])
def sw_control():
    """ Call switch object attribute, can be a value or a function
    
        Endpoint:
            - /mininet/node/control
    
        Attributes:
            - node_name         : string    // Name of the device
            - attribute         : string    // Name of the method or attribute from Mininet object
            - parameter*        : string    // Pass any parameter of the funtion as another GET query parameter
    """
    try:
        sw = app.config['ENVIRONMENT'].net.getNodeByName(request.form.get('node_name', None))
        func = getattr(sw, request.form.get('attribute', None))
        if callable(func):
            args = request.form.to_dict()
            if len(args) > 1:
                del args['node_name']
                del args['attribute']
                r = func(**args)
                return str(r) if r else '', 200
            r = func()
            return str(r) if r else '', 200
        elif isinstance(func, list):
            return list(map(lambda m: str(m), func)), 200
        else:
            return str(func), 200
    except Exception as e:
        warn(f"Failed to run Mininet network method: {e}")
        return '', 404

def exit_handler(*args):
    clean()   
    exit()
    
def clean():
    if app.config.get('ENVIRONMENT'):
        app.config['ENVIRONMENT'].net.stop()
    os.system('sudo mn -c')
        
atexit.register(exit_handler)
signal.signal(signal.SIGTERM, exit_handler)
signal.signal(signal.SIGINT, exit_handler)

clean()

if __name__ == '__main__':
    app.debug = False
    app.run(host='0.0.0.0', port=7000)