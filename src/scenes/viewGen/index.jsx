import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import Topology from "../../service/topology";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

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

    var TopologyService = new Topology();
    let LoadHosts = []
    let LoadSwitchs = []
    let LoadLinks = []
    useEffect(() => {
      TopologyService.getId(id)
      .then((data) => {
          data = data.topology.data;
          if(data.hosts != null){
          Object.entries(data.hosts).map(([key, value]) => 
              {
                return LoadHosts.push({ id: key, ip: value.ip, mac: value.mac });
              }
              );
            }
          if(data.switches != null){
          Object.entries(data.switches).map(([key, value]) => 
            {
              return LoadSwitchs.push({ id: key, filename: value.runtime_json });
            }
            ); 
            
          }
          if(data.links != null){
            Object.entries(data.links).map(([key, value]) => {
              var Ftype= Array.from(value[0])[0]
              var Stype= Array.from(value[0])[1] 
              var type, type2
              var nid = parseInt(key, 10) + 1;
              if(Ftype === "h"){
                  type="Host"
              }else{
                  type="Switch"
              }
              if(Stype === "h"){
                  type2="Host"
              }else{
                  type2="Switch"
              }
              
              return LoadLinks.push({ 
                  id: nid, 
                  nodeA: value[0], 
                  typeA: type, 
                  nodeB: value[1], 
                  typeB: type2 
              });
            });
          }
          setHost(LoadHosts);
          setSwitchs(LoadSwitchs);
          setLinks(LoadLinks);
          setLoading(false);    
      })
      }, []); 

    return (
        <>
        {isLoading === false && (
        <Box m="20px">
          <Header title="View Topology" subtitle="View the Topology of the NetWork" />
          <Box
            m="40px 0 0 0"
            height="75vh"
          >
            
          </Box>
        </Box>
        )}
        </>
      );
}

export default ViewGen;