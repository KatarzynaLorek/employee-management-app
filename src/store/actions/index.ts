import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface EmployeeData {
  id?: string;
  firstName: string;
  lastName: string;
  department: 'accountancy' | 'IT' | 'sales' | 'marketing';
  position: 'junior' | 'regular' | 'senior' | 'manager';
}

export const fetchEmployeesData = createAsyncThunk('employeesData/get', async () => {
  console.log('Action used');
  const response = await axios.get('https://60a13128d2855b00173b1bf7.mockapi.io/employees');
  console.log(response.data);
  return response.data;
});

export const addEmployee = createAsyncThunk<EmployeeData, EmployeeData, { state: RootState }>(
  'employeesData/add',
  async (formData, thunkAPI) => {
    const employeeId = thunkAPI.getState().rootReducer.employees.length + 1;
    const data = { id: employeeId, ...formData };
    const response = await axios.post(
      'https://60a13128d2855b00173b1bf7.mockapi.io/employees',
      data,
    );
    return response.data;
  },
);

export const updateEmployeeData = createAsyncThunk<
  { data: EmployeeData; id: string },
  { formData: EmployeeData; id: string }
>('employeesData/update', async ({ formData, id }) => {
  const data = { id, ...formData };
  const response = await axios.put(
    `https://60a13128d2855b00173b1bf7.mockapi.io/employees/${id}`,
    data,
  );
  return { data: response.data, id: id };
});

export const deleteEmployee = createAsyncThunk<{ data: EmployeeData; id: string }, { id: string }>(
  'employeesData/delete',
  async ({ id }) => {
    const response = await axios.delete(
      `https://60a13128d2855b00173b1bf7.mockapi.io/employees/${id}`,
    );
    return { data: response.data, id: id };
  },
);
