import React from "react";
import { useDropzone } from "react-dropzone";
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import "./Dropzone.css";


function Dropzone({open}) {
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const { getRootProps, getInputProps } = useDropzone({});
    return (
        <div className="dropzone" {... getRootProps({ className: "dropzone"})}>
            <input className="input-zone" {...getInputProps()} />
            <div className="text-center">
                <p className="dropzone-content">
                <Typography
                    variant="h3"
                    fontWeight="500"
                    color = {colors.primary[100]}
                  >
                    Drag your file here
                </Typography>
                </p>
            </div>
        </div>
    );
}

export default Dropzone;
