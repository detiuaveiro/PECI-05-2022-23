from src.DAL.db_context import db
from src import create_app
from src.DAL.models.topology import Topology
from src.Services.topology import Topology_Service

app = create_app()
with app.app_context():
    db.create_all()
    ts = Topology_Service()
    ts.sync_db()
    
