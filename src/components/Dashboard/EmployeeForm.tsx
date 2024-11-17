/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../redux/employeeSlice";

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    name: "",
    role: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    role: "",
    email: "",
  });

  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors: any = {};
    if (!employee.name) {
      newErrors.name = "Name is required";
    }
    if (!employee.role) {
      newErrors.role = "Role is required";
    }
    if (!employee.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(employee.email)) {
      newErrors.email = "Email is not valid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop form submission if validation fails

    // Dispatch addEmployee action to Redux
    dispatch(addEmployee(employee));

    // Show SweetAlert after adding the employee
    Swal.fire({
      icon: "success",
      title: "Employee Added",
      text: `${employee.name} has been successfully added!`,
    });

    // Reset form after submission
    setEmployee({ name: "", role: "", email: "" });
    setErrors({ name: "", role: "", email: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-12">
      <div className="p-6 w-96 h-auto bg-white rounded-xl shadow-md">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          Add Employee
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Employee Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Employee Name"
              value={employee.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="role" className="block text-gray-700">
              Role
            </label>
            <input
              type="text"
              name="role"
              placeholder="Enter Role"
              value={employee.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Employee Email"
              value={employee.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none"
            disabled={Object.values(errors).some((error) => error)} // Disable button if any error exists
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
