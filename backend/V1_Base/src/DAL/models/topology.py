from typing import Any
from ..db_context import db
import json
import os

class Topology(db.Model):       # type: ignore
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    def details(self) -> dict[str, dict]:
        details = {}
        file_names = [file_name for file_name in os.listdir(f'./src/static/topologies/{self.name}/') if file_name.split(".")[-1] == "json"]
        for file_name in file_names:
            with open(f'./src/static/topologies/{self.name}/{file_name}') as f:
                details[file_name] = json.load(f)
        return details

    def view(self) -> dict[str, Any]:
        return {
                "id" : self.id,
                "name" : self.name,
                "created_on" : self.created_on,
                "updated_on" : self.updated_on,
                "details" : self.details()
                }

    def simple_view(self) -> dict[str, Any]:
        return {
                "id" : self.id,
                "name" : self.name,
                "created_on" : self.created_on,
                "updated_on" : self.updated_on,
                }
