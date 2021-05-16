import { createReducer } from '@reduxjs/toolkit';

interface EmployeesState {
  employees: {
    firstName: string;
    lastName: string;
    department: 'accountancy' | 'IT' | 'marketing' | 'sales';
    position: 'junior' | 'regular' | 'senior' | 'manager';
  }[];
}

const initialState: EmployeesState = { employees: [] };

const rootReducer = createReducer(initialState, (builder) => {
  return builder;
});

export default rootReducer;
