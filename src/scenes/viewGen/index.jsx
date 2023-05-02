import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import Topology from "../../service/topology";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";








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
        
        if (data.links != null) {
          const switches = {}; // object to keep track of switches already created
          Object.entries(data.links).map(([key, value]) => {
            const [fromNode, toNode] = value;
            const [fromNodeName, fromPort] = fromNode.split('-');
            const [toNodeName, toPort] = toNode.split('-');
        
            let fromType, toType;
            if (fromNodeName.startsWith("h")) {
              fromType = "Host";
            } else {
              fromType = "Switch";
            }
            if (toNodeName.startsWith("h")) {
              toType = "Host";
            } else {
              toType = "Switch";
            }
        
            let fromSwitch, toSwitch;
            if (fromType === "Switch") {
              if (switches[fromNodeName]) {
                fromSwitch = switches[fromNodeName];
                fromSwitch.ports.push(fromPort);
              } else {
                fromSwitch = {
                  id: Object.keys(switches).length + 1,
                  name: fromNodeName,
                  type: fromType,
                  ports: [fromPort]
                };
                switches[fromNodeName] = fromSwitch;
              }
            } else {
              fromSwitch = {
                id: parseInt(fromNodeName.slice(1)),
                name: fromNodeName,
                type: fromType
              };
            }
        
            if (toType === "Switch") {
              if (switches[toNodeName]) {
                toSwitch = switches[toNodeName];
                toSwitch.ports.push(toPort);
              } else {
                toSwitch = {
                  id: Object.keys(switches).length + 1,
                  name: toNodeName,
                  type: toType,
                  ports: [toPort]
                };
                switches[toNodeName] = toSwitch;
              }
            } else {
              toSwitch = {
                id: parseInt(toNodeName.slice(1)),
                name: toNodeName,
                type: toType
              };
            }
        
            LoadLinks.push({
              id: parseInt(key, 10) + 1,
              nodeA: fromNode,
              typeA: fromType,
              nodeB: toNode,
              typeB: toType,
              switchA: fromSwitch,
              portA: fromPort,
              switchB: toSwitch,
              portB: toPort
            });
          });
        }
      }
      setHost(LoadHosts);
      setSwitchs(LoadSwitchs);
      setLinks(LoadLinks);
      console.log(hosts);
      console.log(switchs);
      console.log(links);
      setLoading(false);
      
    /*
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
    */
      
    });
  }, []);

  const [renderedSwitch, setRenderedSwitch] = useState([]);
  /*TODO: fix multiswitches*/
  const renderNode = (node) => {
    const randomTop = Math.random()*80;
    const randomLeft = Math.random()*80;
  
    if(node.startsWith("h")) {
      return (
        <div className="node host" style={{top: `${randomTop}%`, left: `${randomLeft}%`}}>
          <img src={process.env.PUBLIC_URL + '/assets/host.png'} alt="Host" className="host-image" />
          <div className="node-label">{node}</div>
        </div>
      );
    }else if (node.startsWith("s")) {
      const switchNumber = node.slice(1);
      if (renderedSwitch && renderedSwitch.includes(switchNumber)){
        return null;
      } else {
        setRenderedSwitch([...(renderedSwitch || []), switchNumber]);
        return (
        <div className="node switch" style={{top: `${randomTop}%`, left: `${randomLeft}%`}}>
          <img src={process.env.PUBLIC_URL + '/assets/switch.png'} alt="Switch" className="switch-image" />
          <div className="node-label">{node}</div>
        </div>
      
      )
      }
    } else {
      return null;
    }
  };

  const getNodePosition = (node) =>{
    const link = links.find((l) => l.nodeA === node || l.nodeB === node);
    if(link) {
      const nodeA = link.nodeA;
      const nodeB = link.nodeB;
      if(node === nodeA) {
        return "left";
      }else if (node === nodeB) {
        return "right";
      } else {
        return null;
      }
    }else {
      return null;
    }
    
  }

  return (
    <>
      {isLoading === false && (
        <Box m="20px">
          <Header
            title="View Topology"
            subtitle="View the Topology of the NetWork"
          />
          <Box m="40px 0 0 0" height="75vh">
            <div className="App">
              {links.map((link) => (
                <div className="link" key={link.id}>
                  <div className={`link-line ${link.typeA} ${link.typeB}`} />
                  <div className={`link-dot ${link.typeA}`} />
                  <div className={`link-dot ${link.typeB}`} />
                  <div className={`node-container ${getNodePosition(link.nodeA)} `} >
                    {renderNode(link.nodeA)}
                  </div>
                  <div className={`node-container ${getNodePosition(link.nodeB)}`} >
                    {renderNode(link.nodeB)}
                  </div>
                </div>
              ))}
            </div>
            
          </Box>
        </Box>
      )}
    </>
  );
};

export default ViewGen;
