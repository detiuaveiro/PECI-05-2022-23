import React from "react";
import "./Popup.css";
import { tokens } from "../theme";
import { useTheme, Button } from "@mui/material";

function Popup(props) {
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <Button 
        sx={{
            backgroundColor: colors.blueAccent[800],
            color: colors.primary[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        className="close-btn" onClick={() => props.setTrigger(false)}>
          close
        </Button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
