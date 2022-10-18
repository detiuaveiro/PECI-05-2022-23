from flask import Flask
from .Controllers.topology import topology
from .Controllers.test import test
from .DAL.db_context import db, migrate
import json



def register_blueprints(app : Flask) -> None:
    app.register_blueprint(topology)
    app.register_blueprint(test)


def load_db_config(app : Flask, db_connection_str : str) -> None:
    print(db_connection_str)
    app.config["SQLALCHEMY_DATABASE_URI"] = db_connection_str
    db.init_app(app)
    migrate.init_app(app, db)


def load_appsettings(app : Flask):
    with open(r'./src/appsettings.json') as f:
        settings = json.load(f)
        load_db_config(app, settings["ConnectionStrings"]["aws"])


def setup_app(app : Flask) -> None:
    register_blueprints(app)
    load_appsettings(app)
