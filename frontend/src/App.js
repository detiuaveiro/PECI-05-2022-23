
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Switchs from "./scenes/switchs";
import Hosts from "./scenes/hosts";
import Links from "./scenes/links";
import SwitchTable from "./scenes/switch-table";
import About from "./scenes/about";
import Topo from "./scenes/topo";
import Table from "./scenes/table";
import ViewGen from "./scenes/viewGen";
import Com from "./scenes/commands";
import FAQ from "./scenes/faq";


function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value = {colorMode}>
      <ThemeProvider theme = {theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path ="/" element={<Dashboard />} />
              <Route path ="/Switchs" element={<Switchs />} />
              <Route path ="/Hosts" element={<Hosts/>} />
              <Route path ="/Links" element={<Links/>} />
              <Route path ="/SwitchTable" element={<SwitchTable/>} />                
              <Route path ="/about" element={<About />} />
              <Route path ="/Topo" element={<Topo/>} />
              <Route path ="/Table" element={<Table />} />
              <Route path ="/View" element={<ViewGen />} /> 
              <Route path ="/faq" element={<FAQ />} />
              <Route path ="/Command" element={<Com />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
