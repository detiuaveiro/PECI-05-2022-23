from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class P4DeviceConfig(_message.Message):
    __slots__ = ["device_data", "extras", "reassign"]
    class Extras(_message.Message):
        __slots__ = ["kv"]
        class KvEntry(_message.Message):
            __slots__ = ["key", "value"]
            KEY_FIELD_NUMBER: _ClassVar[int]
            VALUE_FIELD_NUMBER: _ClassVar[int]
            key: str
            value: str
            def __init__(self, key: _Optional[str] = ..., value: _Optional[str] = ...) -> None: ...
        KV_FIELD_NUMBER: _ClassVar[int]
        kv: _containers.ScalarMap[str, str]
        def __init__(self, kv: _Optional[_Mapping[str, str]] = ...) -> None: ...
    DEVICE_DATA_FIELD_NUMBER: _ClassVar[int]
    EXTRAS_FIELD_NUMBER: _ClassVar[int]
    REASSIGN_FIELD_NUMBER: _ClassVar[int]
    device_data: bytes
    extras: P4DeviceConfig.Extras
    reassign: bool
    def __init__(self, reassign: bool = ..., extras: _Optional[_Union[P4DeviceConfig.Extras, _Mapping]] = ..., device_data: _Optional[bytes] = ...) -> None: ...
