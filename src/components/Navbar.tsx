import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
          <button className="bg-red-600 text-white text-lg font-medium px-4 py-2 rounded-md hover:bg-red-700">
            Log Out
          </button>

          {/* Show Employee List Button */}
          <button className="bg-blue-600 text-white text-lg font-medium px-4 py-2 rounded-md hover:bg-blue-700">
            Show Employee List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
