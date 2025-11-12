import ReactFlow, {
  Controls,
  Background,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useDiagram } from '../context/DiagramContext';

function Diagram() {
  // Get all state and handlers from the custom hook
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    onPaneClick,
  } = useDiagram();

  return (
    // This div will grow to fill the available space
    <div className="flex-grow h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
        className="bg-gray-100"
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default Diagram;