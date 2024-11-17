import React from "react";

const Login = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center p-12 rounded-xl shadow-lg bg-gray-200">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="w-full p-3 mb-4 rounded-xl shadow-inner bg-gray-100 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full p-3 mb-4 rounded-xl shadow-inner bg-gray-100 focus:outline-none"
          />
          <button className="w-full py-3 mb-4 rounded-xl bg-blue-500 text-white font-bold shadow-lg hover:bg-blue-600 focus:outline-none">
            Submit
          </button>
          <p>
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-500 underline hover:text-blue-600"
            >
              Create Account
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
