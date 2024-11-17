import React from "react";

const EmployeeList = () => {
  const customerData = JSON.parse(localStorage.getItem("customer") || "{}");
  const employees = customerData.employees || [];

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">
        Employee List
      </h2>
      <ul className="space-y-4">
        {employees.length > 0 ? (
          employees.map((employee: { name: string; role: string }) => (
            <li
              key={employee.name}
              className="p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <p className="text-lg font-medium text-gray-700">
                {employee.name}
              </p>
              <p className="text-sm text-gray-500">{employee.role}</p>
            </li>
          ))
        ) : (
          <li className="p-4 text-gray-500">No employees found.</li>
        )}
      </ul>
    </div>
  );
};

export default EmployeeList;
