import { useState, useEffect } from 'react';
import { useDiagram } from '../context/DiagramContext';
import { FiArrowLeft, FiPlus, FiTrash2, FiSave } from 'react-icons/fi';

export default function Sidebar() {
  const { selectedNode, addNode, updateNodeLabel, removeNode, onPaneClick } =
    useDiagram();
  
  // Local state for the input field
  const [label, setLabel] = useState('');

  // Update local state when the selected node changes
  useEffect(() => {
    setLabel(selectedNode ? selectedNode.data.label : '');
  }, [selectedNode]);

  const handleUpdate = () => {
    if (selectedNode) {
      updateNodeLabel(selectedNode.id, label);
    }
  };

  const handleAdd = () => {
    addNode(label || 'New Node');
    setLabel(''); // Clear input after adding
  };

  const handleRemove = () => {
    if (selectedNode) {
      removeNode(selectedNode.id);
    }
  };

  return (
    <aside className="w-full h-1/3 md:w-72 md:h-full bg-white border-l border-gray-200 p-4 shadow-lg overflow-y-auto">
      {selectedNode ? (
        // --- Edit Node Panel ---
        <div>
          <button
            onClick={onPaneClick} // Use onPaneClick to deselect
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <FiArrowLeft className="mr-1" /> Back to Add
          </button>
          <h3 className="text-xl font-semibold mb-4">Edit Node</h3>
          <div className="mb-4">
            <label
              htmlFor="label"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Label
            </label>
            <input
              type="text"
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleUpdate}
            className="w-full flex justify-center items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            <FiSave className="mr-2" /> Save Changes
          </button>
          <button
            onClick={handleRemove}
            className="w-full flex justify-center items-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors mt-2"
          >
            <FiTrash2 className="mr-2" /> Delete Node
          </button>
        </div>
      ) : (
        // --- Add Node Panel ---
        <div>
          <h3 className="text-xl font-semibold mb-4">Add a Node</h3>
          <div className="mb-4">
            <label
              htmlFor="addLabel"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Node Label
            </label>
            <input
              type="text"
              id="addLabel"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Enter node label"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleAdd}
            className="w-full flex justify-center items-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            <FiPlus className="mr-2" /> Add Node
          </button>
          <p className="text-xs text-gray-500 mt-4">
            Click a node on the canvas to edit or delete it.
          </p>
        </div>
      )}
    </aside>
  );
}