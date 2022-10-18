import React from 'react';
import ReactFlow, {Background, MiniMap , Controls} from 'react-flow-renderer';
import 'reactflow/dist/style.css';


interface Node {
    id : string;
    type? : string;
    data : {
        label : string;
    };
    position : {
        x : number;
        y : number;
    };
};

interface Edge {
    id : string;
    source : string;
    target : string;
    type? : string;

}

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

const edges : Array<Edge> = [
    {
        id : '1-2',
        source : '1',
        target : '2',
        type : 'step'
    }
]

const TopologyDisplay : React.FC = () => {
    return (
        <ReactFlow
            nodes={initialNodes}
            style={{width:'100%',height:'90vh'}}
            edges={edges}
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
