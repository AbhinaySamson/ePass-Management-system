import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import RegisterForm from "./pages/Registerform";
import AddEpass from "./pages/AddEpass";
import EditEpass from "./pages/EditEpass";
import EpassList from "./pages/ViewEpasses";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";



function App() {
  return (
    <Router>
      <div className="navbar">
        <h1>E-Pass System</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/add-epass">Add E-Pass</Link>
          <Link to="/edit-epass">Edit E-Pass</Link>
          <Link to="/epass-list">View E-Passes</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/add-epass" element={<AddEpass />} />
          <Route path="/edit-epass" element={<EditEpass />} />
          <Route path="/epass-list" element={<EpassList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
