/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import EmployeeList from "./components/Dashboard/EmployeeList";
import EmployeeForm from "./components/Dashboard/EmployeeForm";
import Navbar from "./components/Navbar";

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protect these routes by checking if the user is logged in */}
          <Route
            path="/employees"
            element={isLoggedIn ? <EmployeeList /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-employee"
            element={isLoggedIn ? <EmployeeForm /> : <Navigate to="/login" />}
          />

          {/* Redirect from the root path to /login */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
