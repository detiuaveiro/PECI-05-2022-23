import * as React from 'react';
import  { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from "@mui/material";
import { FormControl, TextField, Button } from '@mui/material';
import axios from "axios";

export default function Connect({ devices, updateDevices }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const connectToSwitch = async (name, address) => {
    let devs = Object.values(devices).sort((a, b) => a.device_id - b.device_id);
    let id = devs.length > 0 ? devs[devs.length - 1].device_id + 1 : 0;
    if (address === "") {
      const [ipAddress, port] = devs[devs.length - 1].split(':');
      const modifiedPort = Number(port) + 1;
      address = ipAddress + ':' + modifiedPort;
    }
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("device_id", id);
      formData.append("proto_dump", "dump");
      const response = await axios.post(
        "http://localhost:80/p4runtime/connect",
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
  return (
      <Box marginBottom={"10px"}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Connect Device</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <FormControl>
                <Box display={"flex"}>
                <Box marginRight={"10px"}>
                    <TextField id="deviceName"  label="Name" value={name} onChange={(value) => {setName(value.target.value)}} variant="outlined" />
                </Box>
                <Box marginRight={"10px"}>
                    <TextField id="deviceAddress" label="Address" value={address} onChange={(value) => {setAddress(value.target.value)}} variant="outlined" />
                </Box>
                <Button 
                  onClick={() => connectToSwitch(name, address)}
                  variant="contained">Submit</Button>
                </Box>
            </FormControl>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
