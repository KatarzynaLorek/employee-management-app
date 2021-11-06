import { addEmployee, fetchEmployees, removeEmployee, updateEmployee } from '../actions/employees';
import { IResponseObject } from '../../types/responses';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const employeesAdapter = createEntityAdapter<IResponseObject>({});

const employeesSlice = createSlice({
  name: 'employees',
  initialState: employeesAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      employeesAdapter.setAll(state, action.payload.employees);
    });
    builder.addCase(addEmployee.fulfilled, (state, action) => {
      employeesAdapter.addOne(state, action.payload.employee);
    });
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      const { id, firstName, lastName, department, position } = action.payload.employee;
      employeesAdapter.updateOne(state, {
        id,
        changes: { firstName, lastName, department, position },
      });
    });
    builder.addCase(removeEmployee.fulfilled, (state, action) => {
      const { id } = action.payload.employee;
      employeesAdapter.removeOne(state, id);
    });
  },
});

export const { selectById, selectIds, selectEntities, selectAll, selectTotal } =
  employeesAdapter.getSelectors((state: RootState) => state.employees);

export default employeesSlice.reducer;
