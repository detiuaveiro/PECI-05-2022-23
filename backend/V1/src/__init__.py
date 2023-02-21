from flask import Flask
from .setup import setup_app
from .DAL.db_context import db

def create_controler() -> None:
    pass


def create_app() -> Flask:
    app = Flask(__name__)

    setup_app(app, create_controler)

    return app

