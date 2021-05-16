import React from 'react';
import './TableRow.scss';

interface TableRowProps {
  isTitle?: boolean | undefined;
  handleClick: () => void;
}

const TableRow = ({ isTitle, handleClick }: TableRowProps): JSX.Element => (
  <div className={isTitle ? 'row row--title' : 'row'}>
    <div className="row__part">
      <p className="row__label">Name:</p>
      <p>Name</p>
    </div>
    <div className="row__part">
      <p className="row__label">Surname:</p>Surname
    </div>
    <div className="row__part">
      <p className="row__label">Department:</p>Department
    </div>
    <div className="row__part">
      <p className="row__label">Position:</p>position
    </div>
    <div className="row__part">
      {isTitle ? (
        'Actions'
      ) : (
        <>
          <button onClick={handleClick} className="row__button row__button--update">
            Update
          </button>
          <button className="row__button row__button--delete">delete</button>
        </>
      )}
    </div>
  </div>
);

export default TableRow;
