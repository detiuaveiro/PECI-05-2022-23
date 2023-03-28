import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import { tokens } from "../../theme";

const About = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="About Us" subtitle="Information about the team behind this project" />
      <Card variant="outlined">{
        <CardContent>
          <Typography color={colors.greenAccent[500]} variant="h5">
            David José Araújo Ferreira
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Student at UA
          </Typography>
          <Typography variant="h5" component="div">
          <p>
                Mechanographic Number: 93444
            </p>
            <p>
                E-Mail: davidaraujo@ua.pt
            </p>
            <p>
                Mobile Number: 919217058
            </p>
          </Typography>
        </CardContent>
      }
      </Card>
      <Card variant="outlined">{
        <CardContent>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Guilherme Craveiro
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Student at UA
          </Typography>
          <Typography variant="h5" component="div">
          <p>
                Mechanographic Number: 103574
            </p>
            <p>
                E-Mail: gjscraveiro@ua.pt
            </p>
            <p>
                Mobile Number: 916673015
            </p>
          </Typography>
        </CardContent>
      }
      </Card>
      <Card variant="outlined">{
        <CardContent>
          <Typography color={colors.greenAccent[500]} variant="h5">
          João Machado
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Student at UA
          </Typography>
          <Typography variant="h5" component="div">
          <p>
                Mechanographic Number: 89119
            </p>
            <p>
                E-Mail: jtomaspm@ua.pt
            </p>
            <p>
                Mobile Number: 963688026
            </p>
          </Typography>
        </CardContent>
      }
      </Card>
    </Box>
  );
};

export default About;