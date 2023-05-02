import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import Topology from "../../service/topology";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";

/*
const renderNode = (node) => {
  if(node.startsWith("h")) {
    return (
      <div className="node">
        <img src={process.env.PUBLIC_URL + '/assets/host.png'} alt="Host" className="host-image" />
        <div className="node-label">{node}</div>
      </div>
    );
  }else if (node.startsWith("s")) {
    return (
      <div className="node">
        <img src={process.env.PUBLIC_URL + '/assets/switch.png'} alt="Switch" className="host-image" />
        <div className="node-label">{node}</div>
      </div>
    )
  } else {
    return null;
  }
};
*/

const ViewGen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = useState(0);
  const { state } = useLocation();
  const { id } = state || {};
  const [isLoading, setLoading] = useState(true);
  const [hosts, setHost] = useState();
  const [switchs, setSwitchs] = useState();
  const [links, setLinks] = useState();
  const [h, setH] = useState([]);
  const [s, setS] = useState([]);

  var TopologyService = new Topology();
  let LoadHosts = [];
  let LoadSwitchs = [];
  let LoadLinks = [];
  useEffect(() => {
    TopologyService.getId(id).then((data) => {
      data = data.topology.data;
      if (data.hosts != null) {
        Object.entries(data.hosts).map(([key, value]) => {
          return LoadHosts.push({ id: key, ip: value.ip, mac: value.mac });
        });
      }
      if (data.switches != null) {
        Object.entries(data.switches).map(([key, value]) => {
          return LoadSwitchs.push({ id: key, filename: value.runtime_json });
        });
      }
      if (data.links != null) {
        Object.entries(data.links).map(([key, value]) => {
          var Ftype = Array.from(value[0])[0];
          var Stype = Array.from(value[0])[1];
          var type, type2;
          var nid = parseInt(key, 10) + 1;
          if (Ftype === "h") {
            type = "Host";
          } else {
            type = "Switch";
          }
          if (Stype === "h") {
            type2 = "Host";
          } else {
            type2 = "Switch";
          }

          return LoadLinks.push({
            id: nid,
            nodeA: value[0],
            typeA: type,
            nodeB: value[1],
            typeB: type2,
          });
        });
      }
      setHost(LoadHosts);
      setSwitchs(LoadSwitchs);
      setLinks(LoadLinks);
      console.log(hosts);
      console.log(switchs);
      console.log(links);
      setLoading(false);
      
    {/*
      links.forEach((link) => {
        if (link.typeA === "host") {
          const host = {
            id: link.nodeA,
            name: `Host ${link.nodeA}`,
            ip: `192.168.0.${link.id}`,
          };
          setH((hosts) => [...hosts, host]);
        } else if (link.typeA === "switch") {
          const switchNode = {
            id: link.nodeA,
            name: `Switch ${link.nodeA}`,
            ip: `192.168.0.${link.id}`,
          };
          setS((switches) => [...switches, switchNode]);
        }

        if (link.typeB === "host") {
          const host = {
            id: link.nodeB,
            name: `Host ${link.nodeB}`,
            ip: `192.168.0.${link.id}`,
          };
          setH((hosts) => [...hosts, host]);
        } else if (link.typeB === "switch") {
          const switchNode = {
            id: link.nodeB,
            name: `Switch ${link.nodeB}`,
            ip: `192.168.0.${link.id}`,
          };
          setS((switches) => [...switches, switchNode]);
        }
      });
    */}
    });
  }, []);

  const TopologyDiagram = ({ links }) => {
    const hosts = links.filter((link) => link.typeA === "Host");
    const switches = links.filter((link) => link.typeA === "Switch");
  
    const hostImgs = hosts.map((host) => {
      return (
        <div key={host.id} style={{ display: "inline-block", padding: "10px" }}>
          <img src={`http://${host.nodeA}:8000/h1.png`} alt="host" />
          <div>{host.nodeA}</div>
        </div>
      );
    });
  
    const switchImgs = switches.map((sw) => {
      return (
        <div key={sw.id} style={{ display: "inline-block", padding: "10px" }}>
          <img src={`http://${sw.nodeA}:8000/${sw.nodeB}.png`} alt="switch" />
          <div>{sw.nodeA}</div>
        </div>
      );
    });
  
    
  };

  return (
    <>
      {isLoading === false && (
        <Box m="20px">
          <Header
            title="View Topology"
            subtitle="View the Topology of the NetWork"
          />
          <Box m="40px 0 0 0" height="75vh">
          <div>{hostImgs}</div>
        <div>{switchImgs}</div>
            
          </Box>
        </Box>
      )}
    </>
  );
};

export default ViewGen;
