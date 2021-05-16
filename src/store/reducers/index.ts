import { createSlice } from '@reduxjs/toolkit';
import { fetchEmployeesData, addEmployee, updateEmployeeData, deleteEmployee } from '../actions';

interface EmployeeData {
  id?: string;
  firstName: string;
  lastName: string;
  department: 'accountancy' | 'IT' | 'sales' | 'marketing';
  position: 'junior' | 'regular' | 'senior' | 'manager';
}

interface EmployeesState {
  employees: EmployeeData[];
}

const initialState: EmployeesState = { employees: [] };

const rootSlice = createSlice({
  name: 'employeesData',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeesData.fulfilled, (state, action) => {
        console.log(action.payload);
        state.employees = action.payload;
      })
      .addCase(fetchEmployeesData.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(updateEmployeeData.fulfilled, (state, action) => {
        const newState: EmployeeData[] = [
          ...state.employees.filter((el) => el.id !== action.payload.id),
          action.payload.data,
        ];
        state.employees = newState;
      })
      .addCase(updateEmployeeData.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        const newState: EmployeeData[] = [
          ...state.employees.filter((el) => el.id !== action.payload.id),
        ];
        state.employees = newState;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        console.log(action.error);
      });
  },
});

export default rootSlice.reducer;
