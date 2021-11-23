import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { addEmployee, removeEmployee, updateEmployee } from '../../store/actions/employees';
import { selectAll } from '../../store/reducers/employees';
import { IResponseObject } from '../../types/responses';
import TableView from './TableView';

const TableViewContainer: React.FC = () => {
  const employeesData = useAppSelector((state) => selectAll(state));
  const dispatch = useAppDispatch();

  const handleAddEmployee = (employee: IResponseObject): void => {
    dispatch(addEmployee(employee));
  };

  const handleUpdateEmployee = (employee: IResponseObject): void => {
    dispatch(updateEmployee(employee));
  };

  const handleRemoveEmployee = (employee: IResponseObject): void => {
    dispatch(removeEmployee(employee));
  };

  return (
    <TableView
      tableData={employeesData}
      addEmployee={handleAddEmployee}
      updateEmployee={handleUpdateEmployee}
      removeEmployee={handleRemoveEmployee}
    />
  );
};

export default TableViewContainer;
