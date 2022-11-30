import argparse
import json
import os
import subprocess
from time import sleep

import p4runtime_lib.simple_controller
from mininet.cli import CLI
from mininet.link import TCLink
from mininet.net import Mininet
from mininet.topo import Topo
from p4_mininet import P4Host, P4Switch
from p4runtime_switch import P4RuntimeSwitch


class Switch:

    def __init__(self, switch_json, bmv2_exe='simple_switch'):
        

def get_args():
    cwd = os.getcwd()
    parser = argparse.ArgumentParser()
    parser.add_argument('-j', '--switch_json', type=str, required=False)
    parser.add_argument('-b', '--behavioral-exe', help='Path to behavioral executable',
                        type=str, required=False, default='simple_switch')
    return parser.parse_args()

if __name__ == '__main__':
    args = get_args()
    exercise = Switch(args.switch_json, args.behavioral_exe)

    exercise.run_switch()