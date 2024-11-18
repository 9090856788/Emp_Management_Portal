/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { logout } from "../redux/authSlice";
import { clearUser } from "../redux/userSlice";
import { clearEmployee } from "../redux/employeeSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // To use navigate for redirection

const Navbar = () => {
  const [empBtntoggle, setEmpBtntoggle] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const userName = useSelector((state: RootState) => state.user.user?.name);
  console.log("userName:", userName);

  // Checking whether the user is logged in or not
  const isLoggedIn = !!localStorage.getItem("isLoggedIn");

  // Toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle user logout
  const handleLogout = () => {
    dispatch(logout()); // Reset the Redux auth state
    dispatch(clearUser());
    dispatch(clearEmployee());

    // Clear persisted state from localStorage
    localStorage.removeItem("persist:root");
    localStorage.removeItem("isLoggedIn"); // Clear the isLoggedIn flag

    // Redirect user to Login page
    navigate("/login");
  };

  const showEmployeeList = () => {
    navigate("/employee");
    setEmpBtntoggle(true);
  };
  const addEmployeeList = () => {
    navigate("/add-employees");
    setEmpBtntoggle(!empBtntoggle);
  };

  return (
    <div className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl sm:text-3xl font-medium">
            Hello, {isLoggedIn && userName ? `${userName} 👋` : "👋"} <br />
          </h1>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="sm:hidden flex items-center">
          <button onClick={toggleMenu} className="text-3xl text-red-600">
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Navbar Links - Mobile and Desktop */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } sm:flex sm:items-center sm:space-x-6 mt-4 sm:mt-0`}
        >
          {/* Only show these buttons if the user is logged in */}
          {isLoggedIn && (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white text-lg font-medium px-4 py-2 rounded-md hover:bg-red-700"
              >
                Log Out
              </button>
              {empBtntoggle === true ? (
                <>
                  <button
                    onClick={addEmployeeList}
                    className="bg-blue-600 text-white text-lg font-medium px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Add Employee
                  </button>{" "}
                </>
              ) : (
                <>
                  <button
                    onClick={showEmployeeList}
                    className="bg-blue-600 text-white text-lg font-medium px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Show Employee List
                  </button>
                </>
              )}
              {/* <button
              onClick={showEmployeeList}
                className="bg-blue-600 text-white text-lg font-medium px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Show Employee List
              </button> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
