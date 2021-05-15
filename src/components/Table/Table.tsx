import React from 'react';
import TableRow from './TableRow/TableRow';
import './Table.scss';

const Table: React.FC = () => (
  <div className="table">
    <TableRow isTitle></TableRow>
    <TableRow></TableRow>
    <TableRow></TableRow>
    <TableRow></TableRow>
    <TableRow></TableRow>
    <TableRow></TableRow>
  </div>
);

export default Table;
