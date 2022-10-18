import React, {useState, useCallback } from 'react';
import ReactFlow, {Background, MiniMap , Controls, Node, Edge, NodeChange, EdgeChange, applyEdgeChanges, applyNodeChanges, addEdge, Connection, FitViewOptions } from 'react-flow-renderer';
import 'reactflow/dist/style.css';


const initialNodes : Array<Node>=  [
    {
        id : '1',
        data : {
            label : 'Node'
        },
        position : {
            x : 0,
            y : 0
        }
    }, 
    {
        id : '2',
        data : {
            label : 'Node'
        },
        position : {
            x : 100,
            y : 100
        }
    }, 
];

const initialEdges : Array<Edge> = [
    {
        id : '1-2',
        source : '1',
        target : '2',
        type : 'step'
    }
]

const TopologyDisplay : React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  const fitViewOptions: FitViewOptions = {
    padding: 0.2,
  };

    return (
        <ReactFlow
            style={{width:'100%',height:'90vh'}}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            fitViewOptions={fitViewOptions}
        >
            <Background />
            <Controls />
            <MiniMap
                nodeColor={
                    node => {
                        if (node.type === "input") return 'blue';
                        return "#FFCC00" 
                    }
                }
            />
        </ReactFlow>
    );
}


export default TopologyDisplay;
