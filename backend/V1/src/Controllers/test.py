from flask import Blueprint, request
from typing import Any
from ..Core.globals import STATIC_DIR
from .routes import ROUTES
import random


test : Blueprint = Blueprint('test', __name__)

@test.route(ROUTES["test"], methods=["GET"])
def get() -> str:
    with open(STATIC_DIR + "test/test.txt", 'w') as f:
        f.write(f'{random.randint(0,100)}')
    return "Done!"


@test.route(ROUTES["test"], methods=["POST"])
def post() -> Any:
    return request.get_json()
