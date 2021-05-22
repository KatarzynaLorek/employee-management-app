import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { addEmployee, removeEmployee, updateEmployee } from '../../store/actions/actions';
import { IResponseObject } from '../../types/responses';
import TableView from './TableView';

const TableViewContainer: React.FC = () => {
  const employeesData: IResponseObject[] = useAppSelector((state) => state.rootReducer.employees);
  const dispatch = useAppDispatch();

  const [isAddFormOpen, setAddFormOpen] = useState(false);
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState(Math.ceil(employeesData.length / 5));
  const [tableData, setTableData] = useState<IResponseObject[]>([]);
  const [updatedEmployee, setUpdatedEmployee] = useState<IResponseObject | null>(null);

  useEffect(() => {
    setMaxPageNumber(Math.ceil(employeesData.length / 5));
    setTableData(employeesData.slice(0, 5));
    setCurrentPage(1);
  }, [employeesData]);

  useEffect(() => {
    console.log(employeesData.slice(0, 4));
    currentPage === maxPageNumber
      ? setTableData(employeesData.slice((currentPage - 1) * 5))
      : setTableData(employeesData.slice((currentPage - 1) * 5, currentPage * 5));
  }, [currentPage]);

  const handlePageChange = (type: 'next' | 'prev'): void => {
    type === 'next' ? setCurrentPage(currentPage + 1) : setCurrentPage(currentPage - 1);
  };

  const changeAddFormVisibility = (): void => {
    setAddFormOpen(!isAddFormOpen);
  };

  const changeUpdateFormVisibility = (employee?: IResponseObject): void => {
    employee ? setUpdatedEmployee(employee) : setUpdatedEmployee(null);
    setUpdateFormOpen(!isUpdateFormOpen);
  };

  const handleSubmit = (
    newValues: IResponseObject,
    setSubmitting: (boolean: boolean) => void,
  ): void => {
    updatedEmployee ? dispatch(updateEmployee(newValues)) : dispatch(addEmployee(newValues));
    setSubmitting(false);
    updatedEmployee ? changeUpdateFormVisibility() : changeAddFormVisibility();
  };

  const handleRemoveEmployee = (employee: IResponseObject): Promise<any> =>
    dispatch(removeEmployee(employee.id));

  return (
    <TableView
      isAddFormOpen={isAddFormOpen}
      isUpdateFormOpen={isUpdateFormOpen}
      updatedEmployee={updatedEmployee}
      tableData={tableData}
      handleChangeAddFormVisibility={changeAddFormVisibility}
      handleChangeUpdateFormVisibility={changeUpdateFormVisibility}
      handlePageChange={handlePageChange}
      currentPage={currentPage}
      maxPageNumber={maxPageNumber}
      handleSubmit={handleSubmit}
      handleRemoveEmployee={handleRemoveEmployee}
      newID={String(employeesData.length + 1)}
    />
  );
};

export default TableViewContainer;
