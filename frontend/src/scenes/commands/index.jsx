import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import Disconnect from "./disconnect";
import Upload from "./upload";
import Connect from "./connect";
import Program from "./program";
import GetCounters from "./getcounters";
import GetDevices from "./getdevices";
import Write from "./write";




const Com = () => {
    const [devices, setDevices] = useState([]);

    const fetchDevices = async () => {
      try {
        console.log("Fetching devices...");
        const response = await fetch("http://localhost:80/p4runtime/getconnections");
        const data = await response.json();
        console.log("Devices:", data);

        setDevices(data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

  useEffect(() => {
    fetchDevices();
  }, []);

   return (
    <Box m="20px">
      <Header title="COMMANDS" subtitle="Send a new Command to your Network" />
      <Box sx={
        "margin-bottom: 20px;"
      }>
        <Connect devices={devices} updateDevices={fetchDevices} />
        <Disconnect devices={devices} updateDevices={fetchDevices} />
        <Upload devices={devices} updateDevices={fetchDevices} />
        <Program devices={devices} updateDevices={fetchDevices} />
        <Write devices={devices} updateDevices={fetchDevices} />
        <GetDevices devices={devices} updateDevices={fetchDevices} />
        <GetCounters devices={devices} updateDevices={fetchDevices} />
      </Box>
    </Box>
  );
};

export default Com;
