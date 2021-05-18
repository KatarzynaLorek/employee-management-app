import { AnyAction, Reducer } from 'redux';
import { actionTypes } from '../actions/actions';

interface EmployeeData {
  id?: string;
  firstName: string;
  lastName: string;
  department: 'accountancy' | 'IT' | 'sales' | 'marketing';
  position: 'junior' | 'regular' | 'senior' | 'manager';
}

interface EmployeesState {
  employees: EmployeeData[];
}

const initialState: EmployeesState = { employees: [] };

const rootReducer: Reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.fetchDataSuccess:
      return { employees: [...action.payload] };
    case actionTypes.addEmployeeSuccess:
      return { employees: [...state.employees, action.payload] };
    case actionTypes.updateEmployeeSuccess:
      return {
        employees: [
          ...state.employees.filter((item: EmployeeData) => item.id !== action.payload.id),
          action.payload,
        ],
      };
    case actionTypes.removeEmployeeSuccess:
      return {
        employees: [
          ...state.employees.filter(({ id }: { id: string }) => id !== action.payload.id),
        ],
      };
    default:
      return state;
  }
};

export default rootReducer;
