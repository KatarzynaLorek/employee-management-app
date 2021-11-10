import { IResponseObject } from '../../../types/responses';

export enum TableRowVariant {
  title,
  normal,
}

export interface ITableRow {
  variant: TableRowVariant;
  employeeData?: IResponseObject;
  handleUpdateButtonClick?: (employee: IResponseObject) => void;
  handleDeleteButtonClick?: (employee: IResponseObject) => void;
}
