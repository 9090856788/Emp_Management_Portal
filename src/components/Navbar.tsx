import React from "react";

const Navbar = () => {
  return (
    <div className="w-full fixed top-0 left-0 bg-white shadow-md ">
      <div className="flex items-center justify-between p-2 max-w-7xl mx-auto">
        <h1 className="text-2xl font-medium">
          Hello <br /> <span className="text-3xl font-semibold">Kanhu 👋</span>
        </h1>

        <button className="bg-red-600 text-white text-lg font-medium px-4 py-2 rounded-md hover:bg-red-700">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
