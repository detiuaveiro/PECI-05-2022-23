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
import { useNavigate } from "react-router-dom";
import FileUpload from "../../components/FileUpload";
import RouterOutlined  from "@mui/icons-material/RouterOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";

const Dashboard = () => {
  let navigate = useNavigate();
  let idsArr = [];
  const routeChange = () => {
    window.location.assign("http://localhost:3000");
  };

  const getUploadParams = () => {
    return { url: "http://localhost:80/p4runtime/files/upload/" };
  };

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
  };

  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [buttonPopup, setButtonPopup] = useState(false);
  const [hosts, setHost] = useState();
  const [switchs, setSwitchs] = useState();
  const [links, setLinks] = useState();
  let totalHostCount = 0;
  let totalSwitchCount = 0;
  let totalLinksCount = 0;
  let processedIds = new Set();

  var TopologyService = new Topology();

  function addid(topodata) {
    idsArr = topodata.map((obj) => obj.id);
  }

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
      addid(topodata);
      console.log(idsArr);
      for (let id of idsArr) {
        if (!processedIds.has(id)) {
          processedIds.add(id);
          let promise = TopologyService.getId(id);
          promise.then((result) => {
            let hosts = result.topology?.data?.hosts;
            if (hosts && Object.keys(hosts).length > 0) {
              let hostCount = Object.keys(hosts).length;
              totalHostCount += hostCount;
            }
            setHost(totalHostCount);
            let switches = result.topology?.data?.switchs;
            if (switches && Object.keys(switches).length > 0) {
              let switchCount = Object.keys(switches).length;
              totalSwitchCount += switchCount;
            }
            setSwitchs(totalSwitchCount);
            let links = result.topology?.data?.links;
            console.log(links);
            if (links && Object.keys(links).length) {
              let linkCount = Object.keys(links).length;
              totalLinksCount += linkCount;
            }
            setLinks(totalLinksCount);
            
          });
        }
      }
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
                <Box>
                  <FileUpload />
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
              gridColumn="span 3"
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
                    Number of Active Topologies
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
            <Box
              gridColumn="span 3"
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
                    Number of active Hosts
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    {hosts}
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <RouterOutlined
                      sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box
              gridColumn="span 3"
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
                    Number of active Switches
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    {switchs}
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <StorageOutlinedIcon
                      sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box
              gridColumn="span 3"
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
                    Number of active Links
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    {links}
                  </Typography>
                </Box>
                <Box>
                  <IconButton>
                    <HubOutlinedIcon
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
