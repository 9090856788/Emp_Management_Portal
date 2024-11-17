import React from "react";

const Register = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center p-12 rounded-xl shadow-lg bg-gray-200">
          <h1 className="text-2xl font-bold mb-6">Register</h1>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            className="w-full p-3 mb-4 rounded-xl shadow-inner bg-gray-100 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            required
            className="w-full p-3 mb-4 rounded-xl shadow-inner bg-gray-100 focus:outline-none"
          />
          <input
            type="password"
            name="password"
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
        </div>
      </div>
    </>
  );
};

export default Register;
