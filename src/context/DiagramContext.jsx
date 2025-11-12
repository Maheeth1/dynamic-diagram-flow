import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  useNodesState,
  useEdgesState,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';

// 1. Define initial state (replaces metadata.json for simplicity)
const initialNodes = [
  {
    id: '1',
    type: 'default',
    position: { x: 100, y: 100 },
    data: { label: 'Start Node' },
  },
  {
    id: '2',
    type: 'default',
    position: { x: 300, y: 100 },
    data: { label: 'End Node' },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
];

// 2. Create the Context
const DiagramContext = createContext();

// 3. Create the Provider component
export const DiagramProvider = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  // 4. Handle node selection
  const onNodeClick = useCallback(
    (event, node) => {
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

  // Handle clicking on the canvas to deselect
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  // 5. C.R.U.D. - Add Node
  const addNode = useCallback(
    (label) => {
      const newNode = {
        id: uuidv4(),
        type: 'default',
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: { label: label || 'New Node' },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  // 6. C.R.U.D. - Update Node
  const updateNodeLabel = useCallback(
    (nodeId, newLabel) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            // It's important to create a new object for state to update
            return {
              ...node,
              data: {
                ...node.data,
                label: newLabel,
              },
            };
          }
          return node;
        })
      );
      // Update selectedNode state as well if it's the one being edited
      setSelectedNode((node) =>
        node ? { ...node, data: { ...node.data, label: newLabel } } : null
      );
    },
    [setNodes, setSelectedNode]
  );

  // 7. C.R.U.D. - Remove Node
  const removeNode = useCallback(
    (nodeId) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
      setSelectedNode(null);
    },
    [setNodes, setEdges, setSelectedNode]
  );

  // 8. C.R.U.D. - Add Edge (React Flow default handler)
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds)),
    [setEdges]
  );

  return (
    <DiagramContext.Provider
      value={{
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        selectedNode,
        onNodeClick,
        onPaneClick,
        addNode,
        updateNodeLabel,
        removeNode,
      }}
    >
      {children}
    </DiagramContext.Provider>
  );
};

// 9. Custom hook to easily consume the context
export const useDiagram = () => {
  const context = useContext(DiagramContext);
  if (context === undefined) {
    throw new Error('useDiagram must be used within a DiagramProvider');
  }
  return context;
};