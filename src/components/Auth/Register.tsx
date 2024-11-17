/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */
import React, { useState } from "react";
import bcrypt from "bcryptjs";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setErrors, setUser } from "../../redux/userSlice";

const LOCAL_STORAGE_KEY = "customers";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { errors } = useSelector((state: any) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateField = (name: string, value: string) => {
    let errorMessage = "";
    switch (name) {
      case "name":
        if (!value.trim()) {
          errorMessage = "Name is required.";
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          errorMessage = "Email is required.";
        } else if (!emailRegex.test(value)) {
          errorMessage = "Invalid email format.";
        }
        break;
      case "password":
        if (value.length < 6) {
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

    // Update form data and errors in Redux
    setFormData((prev) => ({ ...prev, [name]: value }));
    dispatch(setErrors({ ...errors, [name]: error }));
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.password.trim() &&
      !errors.name &&
      !errors.email &&
      !errors.password
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    dispatch(setErrors(newErrors));

    // If there are any errors, prevent submission
    if (Object.values(newErrors).some((error) => error)) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fix the errors in the form before submitting.",
      });
      return;
    }

    // Check for duplicate email
    const existingUsers: any[] = (() => {
      try {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        return [];
      }
    })();

    if (existingUsers.some((user) => user.email === formData.email)) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Email already exists. Please use a different email.",
      });
      return;
    }

    // Hash the password before saving
    const hashedPassword = bcrypt.hashSync(formData.password, 10);

    // Create the new user object with hashed password
    const newUser = { ...formData, password: hashedPassword };

    // Update localStorage with the new user
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedUsers));

    // Dispatch the user data to Redux
    dispatch(setUser(newUser));

    // Clear the form after submission
    setFormData({ name: "", email: "", password: "" });

    Swal.fire({
      icon: "success",
      title: "Registration Successful",
      text: "Redirecting to login...",
      timer: 2000,
      timerProgressBar: true,
    });
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white mt-12">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-12 rounded-xl shadow-lg bg-gray-200 sm:w-3/4 md:w-1/2 lg:w-1/3"
      >
        <h1 className="text-2xl font-bold mb-6">Register</h1>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full p-3 mb-3 rounded-xl shadow-inner bg-gray-100 focus:outline-none"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          required
          className="w-full p-3 mb-3 rounded-xl shadow-inner bg-gray-100 focus:outline-none"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
          required
          className="w-full p-3 mb-3 rounded-xl shadow-inner bg-gray-100 focus:outline-none"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full py-3 mb-4 rounded-xl font-bold shadow-lg focus:outline-none ${
            isFormValid()
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
        <p>
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
