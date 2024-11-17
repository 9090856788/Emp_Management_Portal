import React, { useState } from "react";
import bcrypt from "bcryptjs";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isFormValid = email.trim() && password.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Retrieve customer data from localStorage
    const customers = JSON.parse(localStorage.getItem("customers") || "[]");

    // Find the customer with the matching email
    const foundCustomer = customers.find(
      (user: { email: string }) => user.email === email
    );

    if (foundCustomer && bcrypt.compareSync(password, foundCustomer.password)) {
      localStorage.setItem("isLoggedIn", "true");

      // Success message
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back! Redirecting to the Home page...",
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        navigate("/add-employee");
      });
    } else {
      // Error message
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid credentials. Please try again.",
      }).then(() => {
        // Clear the fields after the error popup
        setEmail("");
        setPassword("");
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-12 rounded-xl shadow-lg bg-gray-200"
      >
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl shadow-inner bg-gray-100 focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl shadow-inner bg-gray-100 focus:outline-none"
          required
        />
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-3 mb-4 rounded-xl text-white font-bold shadow-lg focus:outline-none ${
            isFormValid
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
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
      </form>
    </div>
  );
};

export default Login;
