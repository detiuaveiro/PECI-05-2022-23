import logo from './logo.svg';
import './App.css';
import Hosts from "./hosts";
import Switches from "./switches";
import Links from './links.js';
import Mytree from './mytree.js'

function App() {
  return (
    <div className="App">
      <div id="tree_parent">
        <Mytree />
        <Hosts />
        <Switches />
        <Links />
      </div>
    </div>
  );
}

export default App;
