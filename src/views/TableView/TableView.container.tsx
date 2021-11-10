import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { addEmployee, removeEmployee, updateEmployee } from '../../store/actions/employees';
import { selectAll } from '../../store/reducers/employees';
import { IResponseObject } from '../../types/responses';
import TableView from './TableView';

const TableViewContainer: React.FC = () => {
  const employeesData = useAppSelector((state) => selectAll(state));
  const dispatch = useAppDispatch();

  const handleAddEmployee = (employee: IResponseObject): Promise<any> =>
    dispatch(addEmployee(employee));

  const handleUpdateEmployee = (employee: IResponseObject): Promise<any> =>
    dispatch(updateEmployee(employee));

  const handleRemoveEmployee = (employee: IResponseObject): Promise<any> =>
    dispatch(removeEmployee(employee));

  return (
    <TableView
      employeesData={employeesData}
      handleAddEmployee={handleAddEmployee}
      handleUpdateEmployee={handleUpdateEmployee}
      handleRemoveEmployee={handleRemoveEmployee}
    />
  );
};

export default TableViewContainer;
