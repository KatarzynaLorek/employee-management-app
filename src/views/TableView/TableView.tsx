import React from 'react';
import Table from '../../components/Table/Table';
import './TableView.scss';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';
import { IResponseObject } from '../../types/responses';

export interface ITableView {
  isAddFormOpen: boolean;
  isUpdateFormOpen: boolean;
  updatedEmployee: IResponseObject | null;
  tableData: IResponseObject[];
  handleChangeAddFormVisibility: () => void;
  handleChangeUpdateFormVisibility: (employee?: IResponseObject) => void;
  handlePageChange: (type: 'next' | 'prev') => void;
  currentPage: number;
  maxPageNumber: number;
  handleSubmit: (newValues: IResponseObject, setSubmitting: (boolean: boolean) => void) => void;
  handleRemoveEmployee: (employee: IResponseObject) => Promise<any>;
  newID: string;
}

const TableView = ({
  isAddFormOpen,
  isUpdateFormOpen,
  updatedEmployee,
  tableData,
  handleChangeAddFormVisibility,
  handleChangeUpdateFormVisibility,
  handlePageChange,
  currentPage,
  maxPageNumber,
  handleSubmit,
  newID,
  handleRemoveEmployee,
}: ITableView): JSX.Element => {
  return (
    <div className="tableview">
      {isAddFormOpen && (
        <EmployeeForm handleClose={handleChangeAddFormVisibility} handleSubmit={handleSubmit} />
      )}
      {isUpdateFormOpen && (
        <EmployeeForm
          newID={newID}
          employeeData={updatedEmployee}
          handleSubmit={handleSubmit}
          handleClose={handleChangeUpdateFormVisibility}
        />
      )}
      <button
        className="tableview__button tableview__button--add"
        onClick={handleChangeAddFormVisibility}
      >
        Add
      </button>
      <Table
        tableData={tableData}
        handleOpenUpdateForm={handleChangeUpdateFormVisibility}
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
