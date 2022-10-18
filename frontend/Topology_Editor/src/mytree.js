import { useCallback, useState, useEffect } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, useReactFlow,ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';

import data from './dados.json';

const rfStyle = {
  backgroundColor: '#B8CEFF',
};

const initialNodes = [
  // { id: 'node-1', type: 'input', position: { x: 0, y: 0 }, data: { label: 123 } },
  // { id: 'node-2', type: 'output', position: { x: 0, y: 40 }, data: { label: 321 } },
];

const initialEdges=[
  {id: 'edge-1',source:'node-1', target: 'node-2'}
]
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
//const nodeTypes = {  };
let nodeId = 0;
function Mytree() {
  const reactFlowInstance = useReactFlow();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  /*criar os nós a partir do json */
  useEffect(()=>{
    //Hosts
    let listaHosts=Object.entries(data.hosts);

    for(let i=0;i<listaHosts.length;i++){
      const id=listaHosts[i][0];
      const newNode={
          id,
          position: {
            x: i*200,
            y: 100,
          },
          data: {
            label: `Host ${id}`,
          },
      }
        reactFlowInstance.addNodes(newNode);
    }
    //Switches
    let listaSwitches=Object.entries(data.switches);
   
    for(let i=0;i<listaSwitches.length;i++){
      const id=listaSwitches[i][0];
      const newNode={
          id,
          position: {
            x: (i*200),
            y: 200,
          },
          data: {
            label: `Switch ${id}`,
          },
      }
        reactFlowInstance.addNodes(newNode);
        
    }

    /*ligações */
    let listaLinks=Object.entries(data.links);
    for(let i=0;i<listaLinks.length;i++)
    {
      console.log(listaLinks);
      const id='l'+listaLinks[i][0];

      let sourceid = listaLinks[i][1][0];
      if (sourceid.indexOf('-')!=-1)
        sourceid=sourceid.split('-')[0];

      let targetid=listaLinks[i][1][1];
      if (targetid.indexOf('-')!=-1)
        targetid=targetid.split('-')[0];
        
      const newLink={
          id,
          source: sourceid,
          target: targetid,
        }
        reactFlowInstance.addEdges(newLink);
    }
  }, []);


  
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      defaultNodes={nodes}
      defaultEdges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      //nodeTypes={nodeTypes}
      fitView
      style={rfStyle}
    />
  );
}

//export default Mytree;
export default function () {
  return (
    <ReactFlowProvider>
      <Mytree />
    </ReactFlowProvider>
  );
}