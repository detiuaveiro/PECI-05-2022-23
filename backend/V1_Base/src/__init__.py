from flask import Flask
from .setup import setup_app
from .DAL.db_context import db

def create_app() -> Flask:
    app = Flask(__name__)

    setup_app(app)

    return app

