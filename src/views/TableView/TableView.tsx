import React, { useState, useEffect } from 'react';
import Table from '../../components/Table/Table';
import './TableView.scss';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';
import { IResponseObject } from '../../types/responses';
import { ITableView } from './TableView.types';

const TableView: React.FC<ITableView> = ({
  tableData,
  addEmployee,
  updateEmployee,
  removeEmployee,
}: ITableView): JSX.Element => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [updatedEmployee, setUpdatedEmployee] = useState<IResponseObject | null>();
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState(Math.ceil(tableData.length / 5));
  const [tableRows, setTableRows] = useState<IResponseObject[]>([]);

  const newID = (tableData.length + 1).toString();

  useEffect(() => {
    setMaxPageNumber(Math.ceil(tableData.length / 5));
    setTableRows(tableData.slice(0, 5));
    setCurrentPage(1);
  }, [tableData]);

  useEffect(() => {
    currentPage === maxPageNumber
      ? setTableRows(tableData.slice((currentPage - 1) * 5))
      : setTableRows(tableData.slice((currentPage - 1) * 5, currentPage * 5));
  }, [currentPage]);

  const handlePageChange = (type: 'next' | 'prev'): void => {
    type === 'next' ? setCurrentPage(currentPage + 1) : setCurrentPage(currentPage - 1);
  };
  const changeFormVisibility = (): void => {
    updatedEmployee && setUpdatedEmployee(null);
    setFormOpen(!isFormOpen);
  };

  return (
    <div className="tableview">
      {isFormOpen && (
        <EmployeeForm
          id={newID}
          employeeData={!!updatedEmployee ? updatedEmployee : undefined}
          submitAction={!!updateEmployee ? updateEmployee : addEmployee}
          handleClose={changeFormVisibility}
        />
      )}
      <button className="tableview__button--add" onClick={changeFormVisibility}>
        Add
      </button>
      <Table
        data={tableRows}
        handleUpdateButtonClick={(employee: IResponseObject) => {
          setUpdatedEmployee(employee);
          changeFormVisibility();
        }}
        handleDeleteButtonClick={removeEmployee}
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
