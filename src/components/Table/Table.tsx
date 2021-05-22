import React from 'react';
import TableRow from './TableRow/TableRow';
import './Table.scss';
import { IResponseObject } from '../../types/responses';

interface ITableProps {
  handleRemoveEmployee: (employee: IResponseObject) => Promise<any>;
  handleOpenUpdateForm: (employee: IResponseObject) => void;
  tableData: IResponseObject[];
}

const Table = ({
  handleOpenUpdateForm,
  handleRemoveEmployee,
  tableData,
}: ITableProps): JSX.Element => (
  <div className="table">
    <TableRow isTitle />
    {tableData.map((item) => (
      <TableRow
        key={item.id}
        employeeData={item}
        handleOpenUpdateForm={handleOpenUpdateForm}
        handleRemoveEmployee={handleRemoveEmployee}
      ></TableRow>
    ))}
  </div>
);

export default Table;
