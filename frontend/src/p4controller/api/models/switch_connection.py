from abc import ABC

class switch_connection(ABC):
    name : str
    address : str
    device_id : int
    proto_dump_file : str