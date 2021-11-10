import React from 'react';
import { IResponseObject } from '../../../types/responses';
import './TableRow.scss';

interface ITableRow {
  isTitle?: false;
  employeeData: IResponseObject;
  handleOpenUpdateForm: (employee: IResponseObject) => void;
  handleRemoveEmployee: (employee: IResponseObject) => void;
}

interface ITableRowTitle {
  isTitle: true;
}

type TableRowProps = ITableRow | ITableRowTitle;

const TableRow = (props: TableRowProps): JSX.Element => {
  return (
    <div className={!props.isTitle ? 'row' : 'row--title'}>
      <div className="row__part">
        <p className="row__label">First Name</p>
        <p>{!props.isTitle ? props.employeeData.firstName : 'First Name'}</p>
      </div>
      <div className="row__part">
        <p className="row__label">Last Name</p>
        <p>{!props.isTitle ? props.employeeData.lastName : 'Last Name'}</p>
      </div>
      <div className="row__part">
        <p className="row__label">Department</p>
        <p>{!props.isTitle ? props.employeeData.department : 'Department'}</p>
      </div>
      <div className="row__part">
        <p className="row__label">Position</p>
        <p>{!props.isTitle ? props.employeeData.position : 'Position'}</p>
      </div>
      <div className="row__part">
        {!props.isTitle ? (
          <>
            <button
              onClick={() => props.handleOpenUpdateForm(props.employeeData)}
              className="row__button--update"
            >
              Update
            </button>
            <button
              className="row__button--delete"
              onClick={() => {
                props.handleRemoveEmployee(props.employeeData);
              }}
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
