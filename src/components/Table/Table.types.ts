import { IResponseObject } from '../../types/responses';

export interface ITable {
  handleUpdateButtonClick: (employee: IResponseObject) => void;
  handleDeleteButtonClick: (employee: IResponseObject) => void;
  data: IResponseObject[];
}
