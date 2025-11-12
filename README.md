# React Flow Dynamic Diagram Project

This project is a React application that uses the React Flow library to create a dynamic, interactive diagram. The diagram's nodes and edges are rendered based on an initial state, and users can add, edit, and remove nodes via a sidebar.

## 🚀 Tech Stack

* **Framework:** React (using Vite)
* **Diagramming:** React Flow
* **Styling:** Tailwind CSS
* **State Management:** React Context
* **Utility:** `uuid` for unique ID generation

## 📁 Project Structure

* **`src/App.jsx`**: The main application component, responsible for the overall layout (responsive) and wrapping the app in the state provider.
* **`src/context/DiagramContext.jsx`**: A React Context that manages all application state (nodes, edges, selected node) and logic (add, update, remove nodes). This provides a single source of truth.
* **`src/components/Diagram.jsx`**: The component that renders the React Flow canvas, including controls, a minimap, and a background. It gets all its data and event handlers from the `DiagramContext`.
* **`src/components/Sidebar.jsx`**: A context-aware sidebar. It conditionally renders either an "Add Node" form or an "Edit/Delete Node" form based on whether a node is currently selected in the context.

## ⚙️ Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd dynamic-diagram-flow
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173/` (or another port if 5173 is busy).

## USAGE

* **View Diagram:** The initial diagram is loaded from the state defined in `DiagramContext.jsx`.
* **Add Node:** Use the "Add a Node" form in the sidebar. Enter a label and click "Add Node". The new node will appear on the canvas.
* **Edit Node:** Click on any node in the diagram. The sidebar will change to an "Edit Node" panel, pre-filled with the node's current label. Change the label and click "Save Changes".
* **Delete Node:** Click on a node to select it, then click the "Delete Node" button in the sidebar. This will also remove any edges connected to that node.
* **Connect Nodes:** Drag from the handle of one node to the handle of another to create a new edge.
* **Deselect Node:** Click anywhere on the blank canvas (the "pane") to deselect the current node and return to the "Add Node" sidebar.