
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, TextField, FormControl, Button, Select, MenuItem } from "@mui/material";
import axios from "axios";

export default function Write({ devices, updateDevices}) {
    const [tableName, setTableName] = React.useState("");
    const [actionName, setActionName] = React.useState("");
    const [actionParams, setActionParams] = React.useState("");
    const [matchFields, setMatchFields] = React.useState("");

    const getDeviceName = (device_id) => {  
        if(devices) {
            for (const [key, value] of Object.entries(devices)) {
                if(value.device_id === device_id) {
                    return value.name;
                }
            }
        }
        return "";
        }

  const writeTable = async (table, fields, actName, actParams, wrName) => {
    try {
      let formData = new FormData();
      if(table !== "") formData.append("table_name", table);
      if(fields !== "") formData.append("match_fields", fields);
      if(actName !== "") formData.append("action_name", actName);
      if(actParams !== "") formData.append("action_params", actParams);
      if(wrName !== "") formData.append("device_name", wrName);

      const response = await axios.post(
        "http://localhost:80/p4runtime/inserttable",
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
    const [device_id, setDeviceId] = React.useState(-1);
      const handleChange = (event) => {
    setDeviceId(event.target.value);
  };
  return (
      <Box marginBottom={"10px"}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Write Table</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <FormControl>
                <Box display={"flex"}>
                <Box marginRight={"10px"}>
                    <TextField id="deviceName" label="Table Name" value={tableName} onChange={(event) => setTableName(event.target.value)} variant="outlined" />
                </Box>
                <Box marginRight={"10px"}>
                    <TextField id="deviceAddress" label="Action Name" value={actionName} onChange={(event) => setActionName(event.target.value)} variant="outlined" />
                </Box>
                <Box marginRight={"10px"}>
                <Select
                    id="demo-select"
                    value={device_id}
                    onChange={handleChange}
                >
                    {devices ? Object.values(devices).map((device) => (
                        <MenuItem value={device.device_id}>{device.name}</MenuItem>
                    )) : null}
                </Select>
                </Box>
                <Button 
                onClick={() => {writeTable(tableName, matchFields, actionName, actionParams, getDeviceName(device_id)); updateDevices();}}
                variant="contained">Submit</Button>
                </Box>
             <Box
      sx={{
        '& .MuiTextField-root': { marginTop: 2, width: '59ch'},
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-textarea"
          label="Match Fields"
          value={matchFields} onChange={(event) => setMatchFields(event.target.value)}
          placeholder="Mathc Fields"
          multiline
        />
      </div>
    </Box>
             <Box
      sx={{
        '& .MuiTextField-root': { marginTop: 2, width: '59ch'},
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-textarea"
          label="Action Params"
          value={actionParams} onChange={(event) => setActionParams(event.target.value)}
          placeholder="Action Params"
          multiline
        />
      </div>
    </Box>
            </FormControl>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
