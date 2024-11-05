import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProjectView from "./pages/ProjectView";
import AdminView from "./pages/AdminView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/ProjectView" element={<ProjectView />} />
        <Route path="/AdminView" element={<AdminView />} />
      </Routes>
    </Router>
  );
}

export default App;
