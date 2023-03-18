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
  const [data, setData] = useState();

  const columns = [
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
  const handleChange = (event, newValue) =>{
    setValue(newValue);
    }


    var TopologyService = new Topology();
    let LoadHosts = []
    useEffect(() => {
      TopologyService.getId(id)
      .then((data) => {
          data = data.topology.data;
          let LoadSwitchs = []
          let LoadLinks = []
          
          Object.entries(data.hosts).map(([key, value]) => 
              {
                return LoadHosts.push({ id: key, ip: value.ip, mac: value.mac });
              }
              ); 
          setData(LoadHosts);
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
        <DataGrid checkboxSelection rows={data} columns={columns} />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
    )}
    </>
  );
};

export default Table;
