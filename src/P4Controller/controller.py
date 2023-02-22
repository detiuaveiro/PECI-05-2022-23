import argparse
import os
import sys
import warnings
from time import sleep
import grpc


sys.path.append("..")
from p4runtime_lib import bmv2
from p4runtime_lib import helper

SWITCH_TO_HOST_PORT = 1
SWITCH_TO_SWITCH_PORT = 2

def printGrpcError(e):
    print("gRPC Error:", e.details(), end=' ')
    status_code = e.code()
    print("(%s)" % status_code.name, end=' ')
    traceback = sys.exc_info()[2]
    print("[%s:%d]" % (traceback.tb_frame.f_code.co_filename, traceback.tb_lineno))


def connect(name, addr, device_id, proto_dump_fpath):
    """ Connect to bmv2
        Attributes:
            addr                : string    // bmv2 IP:PORT address
            device_id           : string    // device id
            proto_dump_fpath    : string    // File to dump logs
    """
    return bmv2.Bmv2SwitchConnection(name=name,
                                    address=addr,
                                    device_id=device_id,
                                    proto_dump_file=proto_dump_fpath)


def program(sw_conn, p4info, p4json):
    """ Connect to bmv2
        Attributes:
            sw_conn   : string    // Bmv2SwitchConnection to switch
            p4info    : string    // *.p4info.txt file
            p4json    : string    // *.json 
    """
    try:
        sw_conn.p4info = p4info
        p4info_helper = helper.P4InfoHelper(sw_conn.p4info)
        sw_conn.MasterArbitrationUpdate()
        sw_conn.SetForwardingPipelineConfig(p4info=p4info_helper.p4info,
                                        bmv2_json_file_path=p4json)
        return True                           
    except:
        warnings.warn("Failed configuration")
        return False


def insertTableEntry(sw_conn, table_fields):
    p4info_helper = helper.P4InfoHelper(sw_conn.p4info)
    
    if _validateTableEntry(table_fields, p4info_helper):
        table_name = table_fields['table']
        match_fields = table_fields.get('match')  # None if not found
        action_name = table_fields['action_name']
        default_action = table_fields.get('default_action')  # None if not found
        action_params = table_fields['action_params']
        priority = table_fields.get('priority')  # None if not found

        table_entry = p4info_helper.buildTableEntry(
            table_name=table_name,
            match_fields=match_fields,
            default_action=default_action,
            action_name=action_name,
            action_params=action_params,
            priority=priority)

        sw_conn.WriteTableEntry(table_entry)
        return True
    return False


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
                warning.warn("non-zero 'priority' field is required")
                return False            
    return True

# FEATURE - Add/Remove switch
# FEATURE - Add/Remove host
# FEATURE - Add/Remove/Modify link

sw1 = connect("s1","0.0.0.0:50051", 0, "./dump1.txt")
sw2 = connect("s2","0.0.0.0:50052", 1, "./dump2.txt")
sw3 = connect("s3","0.0.0.0:50053", 2, "./dump3.txt")

program(sw1, "advanced_tunnel.p4info.txt", "advanced_tunnel.json")
program(sw2, "advanced_tunnel.p4info.txt", "advanced_tunnel.json")
program(sw3, "advanced_tunnel.p4info.txt", "advanced_tunnel.json")
