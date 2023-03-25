import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Topology from "../../service/topology";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";



const Topo = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();


  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "network",
      headerName: "Network",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { id, network } }) => {
        return (
         <Box
            width="40%"
            p="3px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[600]}
            borderRadius="4px"
          >
            <Link to={"/Table/"}
          state={{ id: id }}>{network}</Link>
          </Box>
        );  
      },
    },
  ];

  /* Translation */
  var TopologyService = new Topology();

  useEffect(() => {
    TopologyService.getTopo()
    .then((data) => {
        data = data.Topologys;
        let topodata = data.map(x => 
            {
                return {
                    id: x._id,
                    network: x.network,
                }
            }
            );
        setData(topodata);
        setLoading(false);   
    })
    }, []);

  return (
    <>
    {isLoading === false && (
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
        <DataGrid checkboxSelection rows={data} columns={columns} />
      </Box>
    </Box>
    )}
    </>
  );
};

export default Topo;