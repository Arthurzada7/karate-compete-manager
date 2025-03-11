
import { 
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: 'final',
    position: { x: 400, y: 0 },
    data: { label: 'Final Match' },
    className: 'bg-white border-2 border-karate-red rounded-lg p-4 shadow-lg',
  },
  {
    id: 'semi1',
    position: { x: 200, y: 100 },
    data: { label: 'Semi-Final 1' },
    className: 'bg-white border border-gray-200 rounded-lg p-4 shadow-md',
  },
  {
    id: 'semi2',
    position: { x: 600, y: 100 },
    data: { label: 'Semi-Final 2' },
    className: 'bg-white border border-gray-200 rounded-lg p-4 shadow-md',
  },
];

const initialEdges = [
  { id: 'semi1-final', source: 'semi1', target: 'final', animated: true },
  { id: 'semi2-final', source: 'semi2', target: 'final', animated: true },
];

const TournamentBracket = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="h-[600px] border rounded-lg bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default TournamentBracket;
