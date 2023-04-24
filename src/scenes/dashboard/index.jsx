import { Box } from "@mui/material";
//import { tokens } from "../../theme";
import Header from "../../components/Header";

const Dashboard = () => {
    return <Box m="20px">
        <Header />
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>
    </Box>
}

export default Dashboard;