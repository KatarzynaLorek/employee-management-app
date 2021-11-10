import { IResponseObject } from '../../types/responses';

export interface ITableView {
  tableData: IResponseObject[];
  addEmployee: (employee: IResponseObject) => void;
  updateEmployee: (employee: IResponseObject) => void;
  removeEmployee: (employee: IResponseObject) => void;
}
