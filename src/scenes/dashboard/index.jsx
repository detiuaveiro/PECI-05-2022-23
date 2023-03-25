import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DownloadOutlinedIcon  from "@mui/icons-material/DownloadOutlined";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EmailIcon from "@mui/icons-material/Email";
import StatBox from "../../components/StatBox";

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
    <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
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
                >
                    <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                    Download Topology
                </Button>
            </Box>
        </Box>

        {/* GRID */}
        <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
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
                            sx={{color: colors.greenAccent[600], fontSize: "26px"}}
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
                            sx={{ color: colors.greenAccent[600], fontSize: "26px"}}
                        />
                    }
                />

            </Box>
            {/* ROW 1 */}
            <Box
             gridColumn="span 8"
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
                            123
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
                <Box height="250px" m="-20px 0 0 0">

                </Box>
            </Box>
            <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                overflow="auto"
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    colors={colors.grey[100]}
                    p="15px"
                >
                    <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                        Type
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    p="15px"
                >
                    <Box>
                        <Typography
                            color={colors.greenAccent[500]}
                            variant="h5"
                            fontWeight="600"
                        >
                            ID
                        </Typography>
                        <Typography color={colors.grey[100]}>
                            USER
                        </Typography>
                        <Typography color={colors.grey[100]}>
                            DATE
                        </Typography>
                        <Box
                            backgroundColor={colors.greenAccent[500]}
                            p="5px 10px"
                            borderRadius="4px"
                        >
                            COST
                        </Box>
                    </Box>

                </Box>

            </Box>

            
        </Box>
    </Box>
    )
}

export default Dashboard;