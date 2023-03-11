import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import data from "../../data/dados.json";


const Links = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "Nº" },
    {
      field: "nodeA",
      headerName: "NODE - A",
      flex: 1,
    },
    {
      field: "typeA",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "nodeB",
      headerName: "NODE - B",
      flex: 1,
    },
    {
      field: "typeB",
      headerName: "Type",
      flex: 1,
    },
  ];

  /* Translation */
  const lista = data.links;
  let loadLinks = [];
  Object.entries(lista).map(([key, value]) => {
    var Ftype= Array.from(value[0])[0]
    var Stype= Array.from(value[0])[1] 
    var type, type2
    var nid = parseInt(key, 10) + 1;
    if(Ftype === "h"){
        type="Host"
    }else{
        type="Switch"
    }
    if(Stype === "h"){
        type2="Host"
    }else{
        type2="Switch"
    }
    
    return loadLinks.push({ 
        id: nid, 
        nodeA: value[0], 
        typeA: type, 
        nodeB: value[1], 
        typeB: type2 
    });
  });

  return (
    <Box m="20px">
      <Header title="LINKS" subtitle="View the Links in the Network" />
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
        <DataGrid checkboxSelection rows={loadLinks} columns={columns} />
      </Box>
    </Box>
  );
};

export default Links;