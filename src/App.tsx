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
// import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
    {/* <Navbar/> */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-employees" element={<EmployeeForm />} />
          <Route path="/employee" element={<EmployeeList />} />
          <Route path="/" element={<Navigate to="/register" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
