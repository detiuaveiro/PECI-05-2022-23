import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import Topology from "../../service/topology";
import React, { useState, useEffect } from "react";
import ReactFlow, { MiniMap, Controls, Background, Handle, Node } from "react-flow-renderer";
import "./App.css";

const CustomNode = ({ data }) => {
  return (
    <div className="custom-node">
      <Handle type="source" position="right" />
      Host
      <br/>
      {data.label}
      
    </div>
  );
};

const edgeOptions = {
  animated: true,
  style: {
    stroke: 'white',
  },
};

const connectionLineStyle = { stroke: 'white' };

const nodeTypes = {
  custom: CustomNode,
};

const ViewGen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { state } = useLocation();
  const { id } = state || {};
  const [isLoading, setLoading] = useState(true);
  const [isLoadingEl, setLoadingEl] = useState(true);

  const [links, setLinks] = useState([]);

  var TopologyService = new Topology();

  useEffect(() => {
    let LoadLinks = [];
    TopologyService.getId(id).then((data) => {
      data = data.topology.data;

      if (data.links != null) {
        Object.entries(data.links).map(([key, value]) => {
          const [fromNode, toNode] = value;
          const [fromNodeName, fromPort] = fromNode.split("-");
          const [toNodeName, toPort] = toNode.split("-");

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
          LoadLinks.push({
            id: parseInt(key, 10) + 1,
            nodeA: fromNode,
            typeA: fromType,
            nodeB: toNode,
            typeB: toType,
          });
        });
      }
      setLinks(LoadLinks);
      setLoading(false);
    });
  }, []);
  function extractNetworkInfo(stateLinks) {
    if (!Array.isArray(stateLinks) || stateLinks.length === 0) {
      return null;
    }
    // Initialize objects to store information about hosts and switches
    const hosts = {};
    const switches = {};

    // Iterate through the state links
    for (const link of stateLinks) {
      const nodeA = link.nodeA;
      const typeA = link.typeA;
      const nodeB = link.nodeB;
      const typeB = link.typeB;

      // Check if node A is a host
      if (typeA === "Host") {
        // Save the port number and switch ID of the host's connection
        const [portNum, switchId] = nodeB.split("-");
        if (nodeA in hosts) {
          hosts[nodeA]["switches"][switchId] = portNum;
        } else {
          hosts[nodeA] = {
            switches: {
              [switchId]: portNum,
            },
          };
        }
      }

      // Check if node A is a switch
      if (typeA === "Switch") {
        // Save the port number and neighbor switch ID of the switch's connection
        const [portNum, neighborId] = nodeB.split("-");
        const switchId = nodeA.split("-")[0];
        if (switchId in switches) {
          switches[switchId]["ports"][portNum] = neighborId;
        } else {
          switches[switchId] = {
            ports: {
              [portNum]: neighborId,
            },
          };
        }
      }
      // // Check if node B is a host
      // if (typeB === "Host") {
      //   // Save the port number and switch ID of the host's connection
      //   const [portNum, switchId] = nodeB.split("-");
      //   if (nodeB in hosts) {
      //     hosts[nodeB]["switches"][switchId] = portNum;
      //   } else {
      //     hosts[nodeB] = {
      //       switches: {
      //         [switchId]: portNum,
      //       },
      //     };
      //   }
      // }

      // Check if node A is a switch
      if (typeA === "Switch") {
        // Save the port number and neighbor switch ID of the switch's connection
        const [portNum, neighborId] = nodeA.split("-");
        const switchId = nodeB.split("-")[0];
        if (switchId in switches) {
          switches[switchId]["ports"][portNum] = neighborId;
        } else {
          switches[switchId] = {
            ports: {
              [portNum]: neighborId,
            },
          };
        }
      }
    }

    return { hosts, switches };
  }

  let info = extractNetworkInfo(links ?? []);
  console.log(info);
  const [elements, setElements] = useState([]);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    if (isLoading === false) {
      const nodes = [];
      const hostline= Math.random() *5;
      // Create host nodes
      for (const host in info.hosts) {
        nodes.push({
          id: host,
          type: 'custom',
          
          data: { label: host },
          position: {
            x:/* Math.random() * (window.innerWidth*0.5)*/ nodes.length*200,
            y:hostline,
          },
          style: { background: "#FF5A5F", color: "#fff" },
        });
      }
      // Create switch nodes
      const hostcount=nodes.length;
      const switchesline=100+ Math.random() *200;
      let x=0;
      for (const switchId in info.switches) {
        nodes.push({
          id: switchId,
          data: { label: `Switch ${switchId}` },
          position: {
            x: (nodes.length-hostcount)*300, // Math.random() * (window.innerWidth*0.5),
            y: switchesline + (x*200),
          },
          style: { background: "#008489", color: "#fff" },
        });
        if(x==0) x=1;
        else x=0;
      }
      // Create links between nodes
      const edges = links.map((link) => ({
        id: link.id.toString(),
        source: link.nodeA.split("-")[0],
        target: link.nodeB.split("-")[0],
      }));
      setElements([...nodes]);
      setConnections([...edges]);
      console.log(nodes);
    }
    setLoadingEl(false);
    
  }, [links]);

  console.log("el", elements);
  console.log("con", connections);
  return (
    <>
      {isLoading === false && isLoadingEl === false && (
        <Box m="20px">
          <Header
            title="View Topology"
            subtitle="View the Topology of the NetWork"
          />
          <Box m="40px 0 0 0" height="75vh">
            <div style={{ height: "79vh" }}>
              <ReactFlow 
                defaultNodes={elements}
                defaultEdges={connections}
                nodeTypes={nodeTypes}
                defaultEdgeOptions={edgeOptions}
                connectionLineStyle={connectionLineStyle}
              >
                <MiniMap 
                  nodeStrokeColor={(n) => {
                    if (n.style?.background) return n.style.background;
                    if (n.type === 'custom') return '#FF0000'; // Custom color for diamond nodes
                    return '#ddd';
                  }}
                  nodeColor={(n) => {
                    if (n.style?.background) return n.style.background;
                    if (n.type === 'custom') return '#FF0000'; // Custom color for diamond nodes
                    return '#fff';
                  }}
                  nodeBorderRadius={2}
                  
                />
                <Controls />
                <Background color="#aaa" gap={16} />
              </ReactFlow>
            </div>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ViewGen;
