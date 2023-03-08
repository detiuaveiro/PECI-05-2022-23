from flask import Blueprint
from flask import request
from .routes import ROUTES
from ..Services.topology import Topology_Service
from .Contracts.response_contracts import error_response


topology : Blueprint = Blueprint('topology', __name__)
topology_service : Topology_Service = Topology_Service()


@topology.route(ROUTES["topology"], methods=["GET"])
def get() -> list[dict]:
    return [topo.simple_view() for topo in topology_service.get()] 


@topology.route(ROUTES["topology"]+"<topology_name>", methods=["POST"])
def post(topology_name : str) -> dict:
    data = request.get_json()
    response = error_response()
    if not data:
        response["errors"].append("No data given")
        return response
        
    new_topo = topology_service.create(topology_name, data) 
    if new_topo:
        return new_topo.view()

    response["errors"].append("Topology already exits")
    return response


@topology.route(ROUTES["topology"]+"<id>", methods=["GET"])
def get_topology(id : int) -> dict[str, dict]:

    topology = topology_service.query(id)
    if topology:
        return topology.view()
    response = error_response()
    response["errors"].append("Topology not found")
    return response


@topology.route(ROUTES["topology"]+"<id>", methods=["DELETE"])
def delete(id : int) -> dict:
    topo = topology_service.delete(id)
    if topo:
        return topo.simple_view()
    response = error_response()
    response["errors"].append("Topology not found")
    return response


@topology.route(ROUTES["topology"]+"<id>", methods=["PUT"])
def update(id : int) -> dict:
    data  = request.get_json()
    response = error_response()
    if not data:
        response["errors"].append("No data given")
        return response

    topo = topology_service.update(id, data)
    if topo:
        return topo.simple_view()

    response["errors"].append("Topology not found")
    return response
    

