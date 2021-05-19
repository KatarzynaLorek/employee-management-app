import React from 'react';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { removeEmployee } from '../../../store/actions/actions';
import { IResponseObject } from '../../../types/responses';
import './TableRow.scss';

interface TableRowProps {
  employeeData?: IResponseObject;
  handleClick: ((employee?: IResponseObject) => void) | (() => void);
}

const TableRow = ({ employeeData, handleClick }: TableRowProps): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <div className={employeeData ? 'row' : 'row row--title'}>
      <div className="row__part">
        <p className="row__label">First Name</p>
        <p>{employeeData ? employeeData.firstName : 'First Name'}</p>
      </div>
      <div className="row__part">
        <p className="row__label">Last Name</p>
        <p>{employeeData ? employeeData.lastName : 'Last Name'}</p>
      </div>
      <div className="row__part">
        <p className="row__label">Department</p>
        <p>{employeeData ? employeeData.department : 'Department'}</p>
      </div>
      <div className="row__part">
        <p className="row__label">Position</p>
        <p>{employeeData ? employeeData.position : 'Position'}</p>
      </div>
      <div className="row__part">
        {employeeData ? (
          <>
            <button
              onClick={() => (employeeData ? handleClick(employeeData) : null)}
              className="row__button row__button--update"
            >
              Update
            </button>
            <button
              className="row__button row__button--delete"
              onClick={() => {
                dispatch(removeEmployee(employeeData.id));
              }}
            >
              delete
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
