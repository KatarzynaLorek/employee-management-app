import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { Action } from 'redux';
import { RootState } from '../store';
import { IResponseObject } from '../../types/responses';

export const actionTypes = {
  fetchDataRequest: 'FETCH_DATA_REQUEST',
  fetchDataSuccess: 'FETCH_DATA_SUCCESS',
  fetchDataFailure: 'FETCH_DATA_FAILURE',
  addEmployeeRequest: 'ADD_EMPLOYEE_REQUEST',
  addEmployeeSuccess: 'ADD_EMPLOYEE_SUCCESS',
  addEmployeeFailure: 'ADD_EMPLOYEE_FAILURE',
  updateEmployeeRequest: 'UPDATE_EMPLOYEE_REQUEST',
  updateEmployeeSuccess: 'UPDATE_EMPLOYEE_SUCCESS',
  updateEmployeeFailure: 'UPDATE_EMPLOYEE_FAILURE',
  removeEmployeeRequest: 'REMOVE_EMPLOYEE_REQUEST',
  removeEmployeeSuccess: 'REMOVE_EMPLOYEE_SUCCESS',
  removeEmployeeFailure: 'REMOVE_EMPLOYEE_FAILURE',
};

export const url = 'https://60a13128d2855b00173b1bf7.mockapi.io/employees';

type thunkAction = ThunkAction<Promise<any>, RootState, unknown, Action<any>>;

export const fetchEmployeesData = (): thunkAction => async (dispatch) => {
  dispatch({ type: actionTypes.fetchDataRequest });
  try {
    const response = await axios.get(url);
    dispatch({
      type: actionTypes.fetchDataSuccess,
      payload: response.data,
    });
  } catch (err) {
    dispatch({ type: actionTypes.fetchDataFailure });
  }
};

export const addEmployee =
  (employeeData: IResponseObject): thunkAction =>
  async (dispatch) => {
    dispatch({ type: actionTypes.addEmployeeRequest });
    try {
      const response = await axios.post(url, employeeData);
      dispatch({
        type: actionTypes.addEmployeeSuccess,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: actionTypes.addEmployeeFailure });
    }
  };

export const updateEmployee =
  (employeeData: IResponseObject): thunkAction =>
  async (dispatch) => {
    dispatch({ type: actionTypes.updateEmployeeRequest });
    const id = employeeData.id;
    try {
      const response = await axios.put(`${url}/${id}`, employeeData);
      dispatch({
        type: actionTypes.updateEmployeeSuccess,
        payload: response.data,
      });
    } catch (err) {
      dispatch({ type: actionTypes.updateEmployeeFailure });
    }
  };

export const removeEmployee =
  (id?: string): thunkAction =>
  async (dispatch) => {
    dispatch({ type: actionTypes.removeEmployeeRequest });
    try {
      await axios.delete(`${url}/${id}`);
      dispatch({
        type: actionTypes.removeEmployeeSuccess,
        payload: {
          id: id,
        },
      });
    } catch (err) {
      dispatch({ type: actionTypes.removeEmployeeFailure });
    }
  };
