import React, { useEffect, useState } from 'react';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';
import Table from '../../components/Table/Table';
import { useAppSelector } from '../../hooks/reduxHooks';
import './TableView.scss';
import { IResponseObject } from '../../types/responses';

const TableView: React.FC = () => {
  const employeesData: IResponseObject[] = useAppSelector((state) => state.rootReducer.employees);

  const [isAddFormOpen, setAddFormOpen] = useState(false);
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState(Math.ceil(employeesData.length / 5));
  const [tableData, setTableData] = useState<IResponseObject[]>([]);
  const [updatedEmployee, setUpdatedEmployee] = useState<IResponseObject | null>(null);

  const handleOpenUpdateForm = (employee?: IResponseObject) => {
    employee && setUpdatedEmployee(employee);
    setUpdateFormOpen(true);
  };

  useEffect(() => {
    setMaxPageNumber(Math.ceil(employeesData.length / 5));
    setTableData([...employeesData.slice(0, 5)]);
    setCurrentPage(1);
  }, [employeesData]);

  useEffect(() => {
    currentPage === maxPageNumber
      ? setTableData(employeesData.slice((currentPage - 1) * 5))
      : setTableData(employeesData.slice((currentPage - 1) * 5, currentPage * 5));
  }, [currentPage]);

  const handlePageChange = (type: 'next' | 'prev') => {
    type === 'next' ? setCurrentPage(currentPage + 1) : setCurrentPage(currentPage - 1);
  };

  return (
    <div className="tableview">
      {isAddFormOpen && <EmployeeForm handleClose={() => setAddFormOpen(false)} />}
      {isUpdateFormOpen && (
        <EmployeeForm employeeData={updatedEmployee} handleClose={() => setUpdateFormOpen(false)} />
      )}
      <button
        className="tableview__button tableview__button--add"
        onClick={() => setAddFormOpen(true)}
      >
        Add
      </button>
      <Table tableData={tableData} handleOpenUpdateForm={handleOpenUpdateForm} />
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
