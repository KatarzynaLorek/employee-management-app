import React from 'react';
import TableRow from './TableRow/TableRow';
import './Table.scss';

interface TableProps {
  handleOpenUpdateForm: () => void;
}

const Table = ({ handleOpenUpdateForm }: TableProps): JSX.Element => (
  <div className="table">
    <TableRow handleClick={handleOpenUpdateForm} isTitle></TableRow>
    <TableRow handleClick={handleOpenUpdateForm}></TableRow>
    <TableRow handleClick={handleOpenUpdateForm}></TableRow>
    <TableRow handleClick={handleOpenUpdateForm}></TableRow>
    <TableRow handleClick={handleOpenUpdateForm}></TableRow>
    <TableRow handleClick={handleOpenUpdateForm}></TableRow>
  </div>
);

export default Table;
