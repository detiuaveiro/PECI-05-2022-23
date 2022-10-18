import React from 'react';
import { ReactFlowProvider } from 'react-flow-renderer';
import TopologyDisplay from './Components/TopologyEditor/TopologyDisplay'
import TopologyList from './Components/TopologyEditor/TopologyList';

const Topology: React.FC = () => {

  return (
    <div>
      <ReactFlowProvider>
        <TopologyList />
        <TopologyDisplay />
      </ReactFlowProvider>
    </div>
  );
};

export default Topology;
