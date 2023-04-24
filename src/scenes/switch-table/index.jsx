import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
       

const SwitchTable = () => {
  const { state } = useLocation();
  const { filename } = state || {};
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let info = [];

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "tableType",
      headerName: "TYPE",
      flex: 1,
    },
    {
      field: "port",
      headerName: "PORT",
      flex: 1,
    },
    {
      field: "value",
      headerName: "DATA",
      flex: 1,
    },
  ];

  useEffect(() => {
    async function fetchData() {

      await fetch("/" + filename, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((result) => result.json())
        .then((dados) => {
          info = dados.table_entries;
          let fakedata = [];
          for (let i = 1; i < info.length; i++) {
            var prt = "(None Used)"
            var action = info[i].action_name;
            var value;
            if (action === "MyIngress.set_nhop") {
              action = "Set NHOP"
              value = "NHOP - IPv4: " + info[i].action_params.nhop_ipv4 + "| DMAC: " + info[i].action_params.nhop_dmac
              prt = info[i].action_params.port
            }else if (action === "MyEgress.rewrite_mac") {
              action = "Rewrite MAC"
              value = "MAC - " + info[i].action_params.smac
            }else if (action === "MyIngress.set_ecmp_select") {
              action = "Set Ecmp Select"
              value = "ECMP - Count: " + info[i].action_params.ecmp_base + 
                " | Base: " + info[i].action_params.ecmp_count;
            }
            fakedata.push({
              id: i,
              tableType: action,
              port : prt,
              value : value,
            });
          }
          setData(fakedata);
          setLoading(false);
        });
    }
    fetchData();
  }, []);



  return (
    <>
      {isLoading === false && (
        <Box m="20px">
          <Header
            title="SWITCHE-TABLE"
            subtitle="View the Switch Table"
          />
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <DataGrid checkboxSelection rows={data} columns={columns} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default SwitchTable;
