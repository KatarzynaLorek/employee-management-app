import rootReducer from './rootReducer';
import { actionTypes } from '../actions/actions';

interface EmployeeData {
  id?: string;
  firstName: string;
  lastName: string;
  department: 'accountancy' | 'IT' | 'sales' | 'marketing';
  position: 'junior' | 'regular' | 'senior' | 'manager';
}

const mockData: EmployeeData = {
  id: '1',
  firstName: 'mockFirstName',
  lastName: 'mockLastName',
  department: 'accountancy',
  position: 'junior',
};

const mockId = mockData.id;

describe('rootReducer', () => {
  it('returns the initial state', () => {
    expect(rootReducer(undefined, { type: undefined })).toEqual({ employees: [] });
  });

  it('handle FETCH_DATA_SUCCESS', () => {
    expect(
      rootReducer({ employees: [] }, { type: actionTypes.fetchDataSuccess, payload: [mockData] }),
    ).toEqual({ employees: [mockData] });
  });

  it('handle ADD_EMPLOYEE_SUCCESS', () => {
    expect(
      rootReducer(
        { employees: [mockData] },
        { type: actionTypes.addEmployeeSuccess, payload: mockData },
      ),
    ).toEqual({ employees: [mockData, mockData] });
  });

  it('handle UPDATE_EMPLOYEE_SUCCESS', () => {
    const mockUpdatedData: EmployeeData = {
      id: '1',
      firstName: 'mockFirstName',
      lastName: 'mockLastName',
      department: 'accountancy',
      position: 'senior',
    };

    expect(
      rootReducer(
        { employees: [mockData] },
        { type: actionTypes.updateEmployeeSuccess, payload: mockUpdatedData },
      ),
    ).toEqual({ employees: [mockUpdatedData] });
  });

  it('handle REMOVE_EMPLOYEE_SUCCESS', () => {
    expect(
      rootReducer(
        { employees: [mockData] },
        { type: actionTypes.removeEmployeeSuccess, payload: { id: mockId } },
      ),
    ).toEqual({ employees: [] });
  });
});
