import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import data from "../../data/dados.json";


const Hosts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "ip",
      headerName: "IP",
      flex: 1,
    },
    {
      field: "mac",
      headerName: "MAC ADDRESS",
      flex: 1,
    },
  ];

  /* Translation */
  const lista = data.hosts;
  let loadHosts = [];
  Object.entries(lista).map(([key, value]) => {
    return loadHosts.push({ id: key, ip: value.ip, mac: value.mac });
  });

  return (
    <Box m="20px">
      <Header title="HOSTS" subtitle="Manage the Hosts in the Network" />
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
        <DataGrid checkboxSelection rows={loadHosts} columns={columns} />
      </Box>
    </Box>
  );
};

export default Hosts;