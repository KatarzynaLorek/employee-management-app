import React from 'react';
import TableRow from './TableRow/TableRow';
import './Table.scss';
import { IResponseObject } from '../../types/responses';

interface ITableProps {
  handleOpenUpdateForm: (employee: IResponseObject | undefined) => void;
  tableData: IResponseObject[];
}

const Table = ({ handleOpenUpdateForm, tableData }: ITableProps): JSX.Element => (
  <div className="table">
    <TableRow handleClick={() => null}></TableRow>
    {tableData.map((item) => (
      <TableRow key={item.id} employeeData={item} handleClick={handleOpenUpdateForm}></TableRow>
    ))}
  </div>
);

export default Table;
