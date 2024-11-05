import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProjectView from "./pages/ProjectView";
import AdminView from "./pages/AdminView";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Home />} />
        <Route path="/ProjectView" element={<ProjectView />} />
        <Route path="/AdminView" element={<AdminView />} />
        <Route path="/login" element={<Login />} />
=======
        <Route path="/" element={<Homepage />} />
        <Route path="/projectview" element={<ProjectView />} />
        <Route path="/adminview" element={<AdminView />} />
>>>>>>> 9576ab37837a4e77cb5ad3ca138feacef0592327
      </Routes>
    </Router>
  );
}

export default App;
