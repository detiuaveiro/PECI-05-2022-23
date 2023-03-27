import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import EmailIcon from "@mui/icons-material/Email";
import StatBox from "../../components/StatBox";
import Topology from "../../service/topology";
import React, { useState, useEffect } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import StackedLineChartOutlinedIcon from "@mui/icons-material/StackedLineChartOutlined";
import Popup from "../../components/Popup";
import Dropzone from "../../components/Dropzone";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  let navigate = useNavigate();
  const routeChange = () => {
    let path = 'http://grafana:3000/';
    navigate(path);
  }

  const getUploadParams = () => {
    return { url: 'http://nginx:80/p4controller_ou_mininet/metodo/' }
  }

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status,meta)
  }

  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [buttonPopup, setButtonPopup] = useState(false);

  var TopologyService = new Topology();

  useEffect(() => {
    TopologyService.getTopo().then((data) => {
      data = data.Topologys;
      let topodata = data.map((x) => {
        return {
          id: x._id,
          network: x.network,
        };
      });
      setData(topodata.length);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading === false && (
        <Box m="20px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            <Box>
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
                onClick={() => setButtonPopup(true)}
              >
                <FileUploadOutlinedIcon sx={{ mr: "10px" }} />
                Upload Files
              </Button>
              <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.primary[100]}
                  >
                    Upload your file here
                </Typography>
                <Dropzone 
                  getUploadParams={getUploadParams}
                  onChangeStatus={handleChangeStatus}
                  onSubmit={handleSubmit}
                />
                <Box>
                </Box>
              </Popup>
            </Box>
          </Box>

          {/* GRID */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="150px"
            gap="20px"
          >
            {/* ROW 1 */}
            <Box
              gridColumn="span 6"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="First Time ?"
                subtitle="Check the FAQ"
                icon={
                  <EmailIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 6"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="Want to Know About Our Team?"
                subtitle="Check our About Page"
                icon={
                  <GroupsOutlinedIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            {/* ROW 2 */}
            <Box
              gridColumn="span 12"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Box
                mt="25px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Number of active topologies
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    {data}
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlinedIcon
                      sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            {/* ROW 3 */}
            <Box
              gridColumn="span 12"
              gridRow="span 1"
              backgroundColor={colors.primary[400]}
            >
              <Box
                mt="25px"
                p="0 20px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Want More Information ?
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    Start Up Grafana and Prometheus to view live data
                  </Typography>
                </Box>
                <Box>
                  <IconButton onClick={routeChange}>
                    <StackedLineChartOutlinedIcon
                      sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
