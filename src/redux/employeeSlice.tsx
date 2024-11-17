// src/redux/employeeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Employee {
  name: string;
  role: string;
  email: string;
}

interface EmployeeState {
  employees: Employee[];
}

const initialState: EmployeeState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addEmployee(state, action: PayloadAction<Employee>) {
      state.employees.push(action.payload);
    },
  },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
