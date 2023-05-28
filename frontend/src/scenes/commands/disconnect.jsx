
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button } from "@mui/material";
import axios from "axios";



export default function Disconnect({ devices, updateDevices }) {

  const disconnect = async (dcName, dcId) => {
    try {
      let formData = new FormData();
      if(dcName !== "") formData.append("device_name", dcName);
      if(dcId !== "") formData.append("device_id", dcId);
      const response = await axios.post(
        "http://localhost:80/p4runtime/disconnect",
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
          <Typography>Disconnect Device</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {devices ? Object.values(devices).map((device) => (
                <Box marginBottom={"10px"} display={"flex"}>
                    <Box marginRight={"10px"}>
                        <p>Device: {device.name} ({device.address})</p>
                    </Box>
                    <Button
                        onClick={() => disconnect(device.name, device.device_id)}
                        variant="contained">Disconnect</Button>
                </Box>
            )) : null}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
