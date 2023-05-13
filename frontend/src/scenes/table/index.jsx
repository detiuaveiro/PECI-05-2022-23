import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import PropTypes from 'prop-types';
import { tokens } from "../../theme";
import { useLocation } from "react-router-dom";
import Topology from "../../service/topology";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  }; 

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }



const Table = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = useState(0);
  const { state } = useLocation();
  const { id } = state || {};
  const [isLoading, setLoading] = useState(true);
  const [hosts, setHost] = useState();
  const [switchs, setSwitchs] = useState();
  const [links, setLinks] = useState();

  const hostcolumns = [
    { field: "id", headerName: "ID" },
    {
      field: "ip",
      headerName: "IP",
      flex: 1,
    },
    {
      field: "mac",
      headerName: "MAC ADDRESS",
      flex: 1,
    },
  ];

  const switchcolumns = [
    { field: "id", headerName: "ID" },
    {
      field: "filename",
      headerName: "Switch-Table",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { filename } }) => {
        return (
         <Box
            width="40%"
            p="3px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[600]}
            borderRadius="4px"
          >
            <Link
          state={{ filename: filename }}>{filename}</Link>
          </Box>
        );  
      },
    },
    
  ];

  const linkscolumns = [
    { field: "id", headerName: "Nº" },
    {
      field: "nodeA",
      headerName: "NODE - A",
      flex: 1,
    },
    {
      field: "typeA",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "nodeB",
      headerName: "NODE - B",
      flex: 1,
    },
    {
      field: "typeB",
      headerName: "Type",
      flex: 1,
    },
  ];

  const handleChange = (event, newValue) =>{
    setValue(newValue);
    }


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
      <Header
        title="Network Topology"
      />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="basic tabs example"
        >
          <Tab label="Hosts" {...a11yProps(0)} />
          <Tab label="Switches" {...a11yProps(1)} />
          <Tab label="Links" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
          <Box
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
          >
        <DataGrid checkboxSelection rows={hosts} columns={hostcolumns} />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Box
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
          >
        <DataGrid checkboxSelection rows={switchs} columns={switchcolumns} />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Box
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
          >
        <DataGrid checkboxSelection rows={links} columns={linkscolumns} />
        </Box>
      </TabPanel>
    </Box>
    )}
    </>
  );
};

export default Table;
