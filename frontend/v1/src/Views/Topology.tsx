import React from 'react';
import { ReactFlowProvider } from 'react-flow-renderer';
import TopologyDisplay from './Components/TopologyEditor/TopologyDisplay'

const Topology: React.FC = () => {

  return (
    <div>
      <ReactFlowProvider>
        <TopologyDisplay />
      </ReactFlowProvider>
    </div>
  );
};

export default Topology;
