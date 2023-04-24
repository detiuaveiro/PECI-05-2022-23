import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import data from "../../data/dados.json";
import { Link } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";



const Switchs = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  /* TODO: Present Switch Table */
  /* Conditionally export filename */
 /* const switchTable= (filename) => {
    console.log(filename)
  }*/


  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "filename",
      headerName: "Switch-Table",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { filename } }) => {
        return (
         <Box
            width="40%"
            p="3px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[600]}
            borderRadius="4px"
          >
            <Link to={"/SwitchTable/"}
          state={{ filename: filename }}>{filename}</Link>
          </Box>
        );  
      },
    },
  ];

  /* Translation */
  const lista = data.switches;
  let loadSwitches = [];
  Object.entries(lista).map(([key, value]) => {
    return loadSwitches.push({ id: key, filename: value.runtime_json });
  });

  return (
    <Box m="20px">
      <Header title="SWITCHES" subtitle="Manage the Switches in the Network" />
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
        <DataGrid checkboxSelection rows={loadSwitches} columns={columns} />
      </Box>
    </Box>
  );
};

export default Switchs;
