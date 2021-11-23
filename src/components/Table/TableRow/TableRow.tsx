import React from 'react';
import './TableRow.scss';
import { ITableRow, TableRowVariant } from './TableRow.types';

const TableRow: React.FC<ITableRow> = ({
  variant,
  employeeData,
  handleUpdateButtonClick,
  handleDeleteButtonClick,
}) => {
  return (
    <div className={variant === TableRowVariant.title ? 'row--title' : 'row'}>
      <div className="row__part">
        <p className="row__label">First Name</p>
        <p>{employeeData?.firstName || 'First Name'}</p>
      </div>
      <div className="row__part">
        <p className="row__label">Last Name</p>
        <p>{employeeData?.lastName || 'Last Name'}</p>
      </div>
      <div className="row__part">
        <p className="row__label">Department</p>
        <p>{employeeData?.department || 'Department'}</p>
      </div>
      <div className="row__part">
        <p className="row__label">Position</p>
        <p>{employeeData?.position || 'Position'}</p>
      </div>
      <div className="row__part">
        {variant === TableRowVariant.normal ? (
          <>
            <button
              onClick={() =>
                employeeData && handleUpdateButtonClick && handleUpdateButtonClick(employeeData)
              }
              className="row__button--update"
            >
              Update
            </button>
            <button
              className="row__button--delete"
              onClick={() =>
                employeeData && handleDeleteButtonClick && handleDeleteButtonClick(employeeData)
              }
            >
              Delete
            </button>
          </>
        ) : (
          'Actions'
        )}
      </div>
    </div>
  );
};

export default TableRow;
