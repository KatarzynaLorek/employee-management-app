import axios, { AxiosError } from 'axios';
import { IResponseObject } from '../../types/responses';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const url = 'https://60a13128d2855b00173b1bf7.mockapi.io/employees';

export const fetchEmployees = createAsyncThunk<
  { employees: IResponseObject[] },
  void,
  { rejectValue: { data: { error_message: string } } }
>('employees/fetchEmployees', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get(url);
    return { employees: response.data };
  } catch (err: any) {
    const error: AxiosError<{ data: { error_message: string } }> = err;
    console.log(error);
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      throw error;
    }
  }
});

export const addEmployee = createAsyncThunk<
  { employee: IResponseObject },
  IResponseObject,
  { rejectValue: { data: { error_message: string } } }
>('employees/fetchEmployees', async (employee, { rejectWithValue }) => {
  try {
    const response = await axios.post(url, employee);
    return { employee: response.data };
  } catch (err: any) {
    const error: AxiosError<{ data: { error_message: string } }> = err;
    console.log(error);
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      throw error;
    }
  }
});

export const updateEmployee = createAsyncThunk<
  { employee: IResponseObject },
  IResponseObject,
  { rejectValue: { data: { error_message: string } } }
>('employees/fetchEmployees', async (employee, { rejectWithValue }) => {
  try {
    const id = employee.id;
    const response = await axios.put(`${url}/${id}`, employee);
    return { employee: response.data };
  } catch (err: any) {
    const error: AxiosError<{ data: { error_message: string } }> = err;
    console.log(error);
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      throw error;
    }
  }
});

export const removeEmployee = createAsyncThunk<
  { employee: IResponseObject },
  IResponseObject,
  { rejectValue: { data: { error_message: string } } }
>('employees/fetchEmployees', async (employee, { rejectWithValue }) => {
  try {
    const id = employee.id;
    const response = await axios.delete(`${url}/${id}`);
    return { employee: response.data.employee };
  } catch (err: any) {
    const error: AxiosError<{ data: { error_message: string } }> = err;
    console.log(error);
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      throw error;
    }
  }
});
