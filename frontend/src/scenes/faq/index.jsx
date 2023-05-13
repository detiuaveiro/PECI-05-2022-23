import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What is P4 language?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            P4 is a programming language used to define how packets are processed in networking devices such as switches and routers.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What is a network monitoring system?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A network monitoring system is a software tool that tracks and analyzes network traffic to help network administrators troubleshoot issues,
            identify security threats, and optimize network performance.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What information does a network monitoring system typically display?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A network monitoring system can display various types of information,
            including network topology, device status, traffic flow, bandwidth usage, packet loss, and security alerts.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How does P4 language enable network monitoring?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            P4 language allows network administrators to specify how packets should be processed by switches and routers,
            including how they should be filtered, modified or forwarded. 
            This makes it possible to implement custom monitoring and analysis functions directly in the network hardware.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What are some benefits of using P4 language for network monitoring?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Using P4 language for network monitoring can provide faster and more efficient processing of network traffic,
            reduce the need for external monitoring devices, and enable more flexible and customizable monitoring capabilities.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Can P4 language be used with existing networking equipment?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, P4 language can be used with both existing and new networking equipment that supports the language.
            However, some devices may require firmware updates or modifications to support P4-based monitoring.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What skills are required to use P4 language for network monitoring?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Using P4 language for network monitoring typically requires a strong background in networking protocols and architectures, 
            as well as experience in programming and software development.
            Some knowledge of hardware design and implementation may also be beneficial. 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Are there any limitations to using P4 language for network monitoring?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, some limitations of using P4 language for network monitoring include the need for specialized hardware that supports the language,
            limited support for complex packet processing tasks, and the potential for increased complexity and difficulty in debugging network issues.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
