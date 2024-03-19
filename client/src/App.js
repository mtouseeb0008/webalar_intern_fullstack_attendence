import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import CalendarView from "./components/CalendarView";
import AttendanceList from "./components/AttendanceList";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import ProtectRoute from "./ProtectRoute";
import axios from "axios";
import { useAuth } from "./AuthContext";

function App() {
  const handleDateSelect = () => {
    console.log("Click");
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/attendance"
          element={
            <ProtectRoute>
              <CalendarView handleDateSelect={handleDateSelect} />
            </ProtectRoute>
          }
        />
        <Route
          path="/attendancelist"
          element={
            <ProtectRoute>
              <AttendanceList />
            </ProtectRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>

      {/* </Switch> */}
    </Router>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// src/App.js
