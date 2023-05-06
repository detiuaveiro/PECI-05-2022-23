import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import Topology from "../../service/topology";
import React, { useState, useEffect } from "react";
import "./App.css";

const ViewGen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { state } = useLocation();
  const { id } = state || {};
  const [isLoading, setLoading] = useState(true);

  const [links, setLinks] = useState();

  var TopologyService = new Topology();

  let LoadLinks = [];
  useEffect(() => {
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
      console.log(links);
      setLoading(false);
    });
  }, []);
  function extractNetworkInfo(stateLinks) {
    if (!Array.isArray(stateLinks)) {
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
    }

    return { hosts, switches };
  }

  let hosts, switches = extractNetworkInfo(links);
  console.log(hosts);
  console.log(switches);
  return (
    <>
      {isLoading === false && (
        <Box m="20px">
          <Header
            title="View Topology"
            subtitle="View the Topology of the NetWork"
          />
          <Box m="40px 0 0 0" height="75vh"></Box>
        </Box>
      )}
    </>
  );
};

export default ViewGen;
