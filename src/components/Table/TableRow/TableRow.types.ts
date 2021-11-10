import { IResponseObject } from '../../../types/responses';

export enum TableRowVariant {
  title,
  normal,
}

export interface ITableRow {
  variant: TableRowVariant;
  employeeData?: IResponseObject;
  handleUpdateButton?: (employee: IResponseObject) => void;
  handleDeleteButton?: (employee: IResponseObject) => void;
}
