import React, { useState } from "react";
import { Box, useTheme, Button, Input } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import CommandBox from "../../components/CommandBox";
import axios from "axios";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Com = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState("");
  const [dcName, setDCName] = useState("");
  const [dcId, setDCId] = useState("");
  const [file, setFile] = useState("");
  const [progName, setProgName] = useState("");
  const [progId, setProgId] = useState("");
  const [wrName, setWrName] = useState("");
  const [table, setTable] = useState("");
  const [actName, setActName] = useState("");
  const [actParams, setActParams] = useState("");
  const [fields, setFields] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = () => {
    setAddress("0.0.0.0:" + address);
    connectToSwitch(name, address, id);
  };

  const connectToSwitch = async (name, address, id) => {
    try {
      const response = await axios.post(
        "http://localhost:80/p4runtime/connect",
        {
          proto_dump: "dump",
          name: name,
          address: address,
          device_id: id,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getConnection = async () => {
    try {
      const response = await axios.post(
        "http://localhost:80/p4runtime/getconnections"
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const disconnect = async (dcName, dcId) => {
    try {
      const response = await axios.post(
        "http://localhost:80/p4runtime/disconnect",
        {
          device_name: dcName,
          device_id: dcId,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const programSwitch = async (file, progName, progId) => {
    try {
      const response = await axios.post(
        "http://localhost:80/p4runtime/program",
        {
          p4file: file,
          device_id: progId,
          device_name: progName,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const writeTable = async (table, fields, actName, actParams, wrName) => {
    try {
      const response = await axios.post(
        "http://localhost:80/p4runtime/inserttable",
        {
          table_name: table,
          match_fields: fields,
          action_name: actName,
          action_params: actParams,
          device_name: wrName,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box m="20px">
      <Header title="COMMANDS" subtitle="Send a new Command to your Network" />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="basic tabs example"
        >
          <Tab label="Connect" {...a11yProps(0)} />
          <Tab label="Program" {...a11yProps(1)} />
          <Tab label="Get" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="150px"
          gap="20px"
        >
          <Box
            gridColumn="span 12"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box width="100%" m="0 30px">
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: colors.grey[100] }}
              >
                Connect to Switch
              </Typography>

              <Box
                sx={{ marginTop: "20px" }}
                width="50%"
                display="flex"
                justifyContent="space-between"
              >
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Switch Name"
                  sx={{ margin: "10px" }}
                />
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Switch Address"
                  sx={{ margin: "10px" }}
                />
                <Input
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Switch ID"
                  sx={{ margin: "10px" }}
                />
              </Box>
            </Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "20px",
              }}
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </Box>
          <Box
            gridColumn="span 12"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box width="100%" m="0 30px">
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: colors.grey[100] }}
              >
                Disconnect Switch
              </Typography>

              <Box
                sx={{ marginTop: "20px" }}
                width="31%"
                display="flex"
                justifyContent="space-between"
              >
                <Input
                  value={dcName}
                  onChange={(e) => setDCName(e.target.value)}
                  placeholder="Switch Name"
                  sx={{ margin: "10px" }}
                />
                <Input
                  value={dcId}
                  onChange={(e) => setDCId(e.target.value)}
                  placeholder="Switch ID"
                  sx={{ margin: "10px" }}
                />
              </Box>
            </Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "20px",
              }}
              onClick={() => disconnect(dcName, dcId)}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="150px"
          gap="20px"
        >
          <Box
            gridColumn="span 12"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box width="100%" m="0 30px">
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: colors.grey[100] }}
              >
                Program Switch
              </Typography>
              <Box
                sx={{ marginTop: "20px" }}
                width="50%"
                display="flex"
                justifyContent="space-between"
              >
                <Input
                  value={file}
                  onChange={(e) => setFile(e.target.value)}
                  placeholder="P4 File"
                  sx={{ margin: "10px" }}
                />
                <Input
                  value={progName}
                  onChange={(e) => setProgName(e.target.value)}
                  placeholder="Switch Name"
                  sx={{ margin: "10px" }}
                />
                <Input
                  value={progId}
                  onChange={(e) => setProgId(e.target.value)}
                  placeholder="Switch ID"
                  sx={{ margin: "10px" }}
                />
              </Box>
              </Box>
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  margin: "20px",
                }}
                onClick={() => programSwitch(file, progName, progId)}
              >
                Submit
              </Button>
            
          </Box>
          <Box
            gridColumn="span 12"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box width="100%" m="0 30px">
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: colors.grey[100] }}
              >
                Write Table
              </Typography>
              <Box
                sx={{ marginTop: "20px" }}
                width="50%"
                display="flex"
                justifyContent="space-between"
              >
                <Input
                  value={table}
                  onChange={(e) => setTable(e.target.value)}
                  placeholder="Table Name"
                  sx={{ margin: "10px" }}
                />
                <Input
                  value={fields}
                  onChange={(e) => setFields(e.target.value)}
                  placeholder="Match Fields"
                  sx={{ margin: "10px" }}
                />
                <Input
                  value={actName}
                  onChange={(e) => setActName(e.target.value)}
                  placeholder="Action Name"
                  sx={{ margin: "10px" }}
                />
                <Input
                  value={actParams}
                  onChange={(e) => setActParams(e.target.value)}
                  placeholder="Action Params"
                  sx={{ margin: "10px" }}
                />
                <Input
                  value={wrName}
                  onChange={(e) => setWrName(e.target.value)}
                  placeholder="Device Name"
                  sx={{ margin: "10px" }}
                />
              </Box>
            </Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "20px",
              }}
              onClick={() => writeTable(table, fields, actName, actParams, wrName)}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </TabPanel>
      {/*
      <TabPanel value={value} index={2}>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="150px"
          gap="20px"
        >
          <Box
            gridColumn="span 12"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CommandBox title="Get Connections" />
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "20px",
              }}
              onClick={() => getConnection()}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </TabPanel>
            */}
    </Box>
  );
};

export default Com;
