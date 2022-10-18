import os
import json
from ..DAL.db_context import db
from ..DAL.models.topology import Topology
from ..Core.globals import STATIC_DIR
from typing import Any
import shutil

class Topology_Service:
    def __init__(self):
        self.directoy = STATIC_DIR + 'topologies/'

    def sync_db(self) -> None:
        topos = self.get_topology_folder_names()
        for topo in topos:
            if self.query_by_name(topo):
                continue
            new_topo = Topology(name=topo)
            db.session.add(new_topo)
            db.session.commit()


    """Get topology folder names"""
    def get_topology_folder_names(self) -> list[str]:
        return os.listdir(self.directoy)

    """Get all topology objects"""
    def get(self) -> list[Topology]:
        return db.session.execute(db.select(Topology).order_by(Topology.updated_on)).scalars()

    """Query by id"""
    def query(self, id : int) -> Topology | None:
        return db.session.execute(db.select(Topology).where(Topology.id == id)).scalar()

    """Get topology by name"""
    def query_by_name(self, name : str) -> Topology | None:
        return db.session.execute(db.select(Topology).where(Topology.name == name)).scalar()

    """Create new topology"""
    def create(self, name : str, data : dict) -> Topology | None:
        #Error: Topo exists
        if self.query_by_name(name) or (name in self.get_topology_folder_names()):
            return None

        new_topo = Topology(name=name)
        db.session.add(new_topo)
        db.session.commit()
        os.mkdir(self.directoy+name)
        for filename in data:
            with open(self.directoy + name + f'/{filename}', 'w') as f:
                f.write(json.dumps(data[filename], indent=4))
        
        return new_topo

    """Delete Topology"""
    def delete(self, id : int) -> Topology | None:
        topo = self.query(id)
        if not topo:
            return None
        shutil.rmtree(STATIC_DIR + topo.name)
        return topo


    """Update Topology"""
    def update(self, id : int, data : dict) -> None | Topology:
        topo = self.query(id)
        if not topo:
            return None
        self.delete(id)
        return self.create(topo.name, data)
