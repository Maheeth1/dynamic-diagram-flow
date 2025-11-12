import { DiagramProvider } from './context/DiagramContext';
import Diagram from './components/Diagram';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <DiagramProvider>
      {/* This layout is responsive:
        - On mobile (default): flex-col (Sidebar on top, Diagram below)
        - On medium screens and up (md:): flex-row (Sidebar on the right)
      */}
      <div className="w-screen h-screen flex flex-col-reverse md:flex-row">
        <Diagram />
        <Sidebar />
      </div>
    </DiagramProvider>
  );
}

export default App;