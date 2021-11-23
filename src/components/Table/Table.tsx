import React from 'react';
import TableRow from './TableRow/TableRow';
import './Table.scss';
import { TableRowVariant } from './TableRow/TableRow.types';
import { ITable } from './Table.types';

const Table: React.FC<ITable> = ({ handleUpdateButtonClick, handleDeleteButtonClick, data }) => (
  <div className="table">
    <TableRow variant={TableRowVariant.title} />
    {data.map((item) => (
      <TableRow
        key={item.id}
        variant={TableRowVariant.normal}
        employeeData={item}
        handleUpdateButtonClick={handleUpdateButtonClick}
        handleDeleteButtonClick={handleDeleteButtonClick}
      ></TableRow>
    ))}
  </div>
);

export default Table;
