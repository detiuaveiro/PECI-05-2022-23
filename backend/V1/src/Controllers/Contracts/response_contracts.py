from typing import Any


def error_response() -> dict[str, Any]:
    return {
        "sucess" : False,
        "errors" : []
        }
