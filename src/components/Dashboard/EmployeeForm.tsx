import React, { useState } from "react";

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    name: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customerData = JSON.parse(localStorage.getItem("customer") || "{}");
    const updatedEmployees = [...(customerData.employees || []), employee];
    localStorage.setItem(
      "customer",
      JSON.stringify({ ...customerData, employees: updatedEmployees })
    );
    alert("Employee added");
    setEmployee({ name: "", role: "" }); // Reset form after submission
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
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
            placeholder="Enter employee name"
            value={employee.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-gray-700">
            Role
          </label>
          <input
            type="text"
            name="role"
            placeholder="Enter role"
            value={employee.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
