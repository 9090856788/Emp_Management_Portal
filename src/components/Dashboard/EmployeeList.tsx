import { useSelector } from "react-redux";
import { RootState } from "../../redux/store"; // Adjust the path to your store file

const EmployeeList = () => {
  // Fetch employees from Redux store
  const employees = useSelector(
    (state: RootState) => state.employee.employees || []
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-4xl w-full mx-auto bg-white rounded-xl shadow-md mt-12">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          Employee List
        </h2>
        <ul className="space-y-4">
          {employees.length > 0 ? (
            employees.map(
              (
                employee: { name: string; role: string; email: string },
                index: number
              ) => (
                <li
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg shadow-md"
                >
                  <p className="text-lg font-medium text-gray-700">
                    {employee.name}
                  </p>
                  <p className="text-sm text-gray-500">{employee.role}</p>
                  <p className="text-sm text-gray-500">{employee.email}</p>
                </li>
              )
            )
          ) : (
            <li className="p-4 text-gray-500">No employees found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeList;
