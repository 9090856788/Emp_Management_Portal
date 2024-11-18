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
  // ProtectedRoute Component
  const ProtectedRoute = ({ redirectPath = "/login" }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      return <Navigate to={redirectPath} />;
    }

    return <EmployeeForm />;
  };
  return (
    <>
      {/* <Navbar /> */}
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/add-employees" element={<EmployeeForm />} />
          <Route path="/employee" element={<EmployeeList />} /> */}

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/add-employees" element={<EmployeeList />} />
            {/* <Route path="/employee" element={<EmployeeList />} /> */}
          </Route>
          <Route path="/employee" element={<EmployeeList />} />

          {/* Default Route: Redirect to /register if the user is not logged in */}
          <Route path="/" element={<Navigate to="/register" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
