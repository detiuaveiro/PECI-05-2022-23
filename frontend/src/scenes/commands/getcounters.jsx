
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from "@mui/material";

export default function GetCounters({ devices, updateDevices }) {
  return (
      <Box marginBottom={"10px"}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Get Counters</Typography>
        </AccordionSummary>
        <AccordionDetails>
                    {devices ? Object.values(devices).map((device) => (
                <div key={device.id}>
                    <p>{device.name}</p>
                    <p>{device.id}</p>
                </div>
            )) : null}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
