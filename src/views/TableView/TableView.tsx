import React, { useState, useEffect } from 'react';
import Table from '../../components/Table/Table';
import './TableView.scss';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';
import { IResponseObject } from '../../types/responses';

export interface ITableView {
  employeesData: IResponseObject[];
  handleAddEmployee: (employee: IResponseObject) => Promise<any>;
  handleUpdateEmployee: (employee: IResponseObject) => Promise<any>;
  handleRemoveEmployee: (employee: IResponseObject) => Promise<any>;
}

const TableView = ({
  employeesData,
  handleAddEmployee,
  handleUpdateEmployee,
  handleRemoveEmployee,
}: ITableView): JSX.Element => {
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
  return (
    <div className="tableview">
      {isAddFormOpen && (
        <EmployeeForm handleClose={changeAddFormVisibility} submitAction={handleAddEmployee} />
      )}
      {isUpdateFormOpen && (
        <EmployeeForm
          newID={String(employeesData.length + 1)}
          employeeData={updatedEmployee}
          submitAction={handleUpdateEmployee}
          handleClose={changeUpdateFormVisibility}
        />
      )}
      <button className="tableview__button--add" onClick={changeAddFormVisibility}>
        Add
      </button>
      <Table
        tableData={tableData}
        handleOpenUpdateForm={changeUpdateFormVisibility}
        handleRemoveEmployee={handleRemoveEmployee}
      />
      <div className="tableview__navigation">
        <button
          className="tableview__button"
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="tableview__button"
          onClick={() => handlePageChange('next')}
          disabled={currentPage === maxPageNumber}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableView;
