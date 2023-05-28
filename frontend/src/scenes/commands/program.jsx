
import * as React from 'react';
import {useState} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Select, MenuItem, TextField, Button } from "@mui/material";
import axios from "axios";

export default function Program({ devices, updateDevices}) {
  const programSwitch = async (file, id) => {
    let device = Object.values(devices).find((device) => device.device_id === id);
    try {
      let formData = new FormData();
      formData.append("p4file", file);
      if(device.name !== "") formData.append("device_name", device.name);
      if(device.device_id !== "") formData.append("device_id", device.device_id);
      const response = await axios.post(
        "http://localhost:80/p4runtime/program",
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
    updateDevices();
  };
  const [file, setFile] = React.useState("");
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
          <Typography>Program Devices</Typography>
        </AccordionSummary>
        <AccordionDetails>
                <Box display={"flex"}>
                <Box marginRight={"10px"}>
                    <TextField id="deviceAddress" label="File Name" value={file} onChange={(event) => {setFile(event.target.value)}} variant="outlined" />
                </Box>
                <Box marginRight={"10px"}>
                <Select
                    id="demo-simple-select"
                    value={device_id}
                    onChange={handleChange}
                >
                    {devices ? Object.values(devices).map((device) => (
                        <MenuItem value={device.device_id}>{device.name}</MenuItem>
                    )) : null}
                </Select>
                </Box>
                <Button variant="contained" onClick={() => programSwitch(file, device_id)}>Submit</Button>
                </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
