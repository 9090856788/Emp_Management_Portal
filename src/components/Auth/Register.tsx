/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {};

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center p-12 rounded-xl shadow-lg bg-gray-200"
        >
          <h1 className="text-2xl font-bold mb-6">Register</h1>

          <input
            type="text"
            name="fullName"
            value={formData.name}
            placeholder="Full Name"
            required
            className="w-full p-3 mb-4 rounded-xl shadow-inner bg-gray-100 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter Email"
            required
            className="w-full p-3 mb-4 rounded-xl shadow-inner bg-gray-100 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter Password"
            required
            className="w-full p-3 mb-4 rounded-xl shadow-inner bg-gray-100 focus:outline-none"
          />
          <button className="w-full py-3 mb-4 rounded-xl bg-blue-500 text-white font-bold shadow-lg hover:bg-blue-600 focus:outline-none">
            Submit
          </button>
          <p>
            If you have an account?{" "}
            <a href="/login" className="text-blue-500 underline">
              Try to login
            </a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
