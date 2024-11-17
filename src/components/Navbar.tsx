/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { logout, setIsLoggedIn } from "../redux/authSlice"; 
import { clearUser } from "../redux/userSlice"; 
import { AppDispatch } from "../redux/store"; 
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>(); 

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // Dispatch the logout action to reset the auth state and set isLoggedIn to false
    dispatch(logout());

    // Dispatch the clearUser action to reset user state
    dispatch(clearUser());
    dispatch(setIsLoggedIn(false));
    // Clear the persisted state from localStorage manually
    localStorage.removeItem("persist:root"); // Clear Redux Persist data
    localStorage.removeItem("customers"); // Clear any other persisted user data (if necessary)
  };

  return (
    <div className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl sm:text-3xl font-medium">
            Hello <br />
            <span className="text-3xl sm:text-4xl font-semibold">Kanhu 👋</span>
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
          {/* Log Out Button */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white text-lg font-medium px-4 py-2 rounded-md hover:bg-red-700"
          >
            Log Out
          </button>

          {/* Show Employee List Button */}
          {/* You can conditionally render this button based on the logged-in status */}
          <button className="bg-blue-600 text-white text-lg font-medium px-4 py-2 rounded-md hover:bg-blue-700">
            Show Employee List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
