import { IResponseObject } from '../../types/responses';

export enum EmployeeFormVariant {
  add = 'add',
  update = 'update',
}
export interface IEmployeeForm {
  handleClose: () => void;
  id: string;
  submitAction: (employee: IResponseObject) => void;
  employeeData?: IResponseObject;
}
