/* eslint-disable no-case-declarations */
import React, { useState } from "react";
import bcrypt from "bcryptjs";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Use dispatch to trigger login action

  const validateField = (name: string, value: string) => {
    let errorMessage = "";
    switch (name) {
      case "email":
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!value.trim()) {
          errorMessage = "Email is required.";
        } else if (!emailRegex.test(value)) {
          errorMessage = "Invalid email format.";
        }
        break;
      case "password":
        if (!value.trim()) {
          errorMessage = "Password is required.";
        } else if (value.length < 6) {
          errorMessage = "Password must be at least 6 characters.";
        }
        break;
      default:
        break;
    }
    return errorMessage;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    // Update values and errors
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const isFormValid = () => {
    return email.trim() && password.trim() && !errors.email && !errors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setIsSubmitting(true);

    // Validate inputs
    const newErrors = {
      email: validateField("email", email),
      password: validateField("password", password),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fix the errors in the form before submitting.",
      });
      // setIsSubmitting(false);
      return;
    }

    // Retrieve customer data from localStorage
    const customers = JSON.parse(localStorage.getItem("customers") || "[]");
    console.log("customers", customers);

    // Find the customer with the matching email
    const foundCustomer = customers.find(
      (user: { email: string }) => user.email === email
    );

    if (foundCustomer && bcrypt.compareSync(password, foundCustomer.password)) {
      // Dispatch login action to Redux store
      dispatch(login(foundCustomer)); // Pass user data to the login action

      localStorage.setItem("isLoggedIn", "true");

      // Success message
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back! Redirecting to the Home page...",
        timer: 1000,
        timerProgressBar: true,
      }).then(() => {
        navigate("/add-employees");
      });
    } else {
      // Error message
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid credentials. Please try again.",
      }).then(() => {
        setEmail("");
        setPassword("");
      });
    }

    // setIsSubmitting(false);
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
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-xl shadow-inner bg-gray-100 focus:outline-none"
          required
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-xl shadow-inner bg-gray-100 focus:outline-none"
          required
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full py-3 mb-4 rounded-xl text-white font-bold shadow-lg focus:outline-none ${
            isFormValid()
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit
          {/* {isSubmitting ? "Submitting..." : "Submit"} */}
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
