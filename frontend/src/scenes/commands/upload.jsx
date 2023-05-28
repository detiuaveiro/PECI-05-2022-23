
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button } from "@mui/material";
import axios from 'axios';

export default function Upload({ devices, updateDevices }) {
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post('http://localhost:80/p4runtime/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
const [file, setFile] = React.useState(null);
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };
  return (
      <Box marginBottom={"10px"}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Upload File</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <input type="file" onChange={handleFileUpload} />
            <Button 
                onClick={() => {uploadFile(file)}}
                variant="contained">Submit</Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
