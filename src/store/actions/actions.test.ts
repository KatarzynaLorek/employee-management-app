import {
  fetchEmployeesData,
  addEmployee,
  updateEmployee,
  removeEmployee,
  actionTypes,
  url,
} from './actions';
import { configureMockStore, MockStoreEnhanced } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

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

const middlewares = [thunk];
const mockStore =
  configureMockStore<RootState, Action<any>, ThunkDispatch<RootState, unknown, Action<any>>>(
    middlewares,
  );

let mock: MockAdapter;
let store: MockStoreEnhanced<
  RootState,
  Action<any>,
  ThunkDispatch<RootState, unknown, Action<any>>
>;

describe('async actions', () => {
  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = mockStore({ rootReducer: { employees: [] } });
  });
  afterEach(() => {
    mock.reset();
  });

  it('creates FETCH_DATA_SUCCESS action when fetching employees has been done', async () => {
    mock.onGet(url).reply(200, mockData);

    const expectedActions: Array<{ type: string; payload?: EmployeeData }> = [
      { type: actionTypes.fetchDataRequest },
      { type: actionTypes.fetchDataSuccess, payload: mockData },
    ];

    await store.dispatch(fetchEmployeesData());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates ADD_EMPLOYEE_SUCCESS action when adding new employee has been done', async () => {
    mock.onPost(url, mockData).reply(200, mockData);

    const expectedActions: Array<{ type: string; payload?: EmployeeData }> = [
      { type: actionTypes.addEmployeeRequest },
      { type: actionTypes.addEmployeeSuccess, payload: mockData },
    ];

    await store.dispatch(addEmployee(mockData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates UPDATE_EMPLOYEE_SUCCESS action when updating employee has been done', async () => {
    mock.onPut(`${url}/${mockId}`, mockData).reply(200, mockData);

    const expectedActions: Array<{ type: string; payload?: EmployeeData }> = [
      { type: actionTypes.updateEmployeeRequest },
      { type: actionTypes.updateEmployeeSuccess, payload: mockData },
    ];

    await store.dispatch(updateEmployee(mockData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates REMOVE_EMPLOYEE_SUCCESS action when deleting employee has been done', async () => {
    mock.onDelete(`${url}/${mockId}`).reply(200, mockData);

    const expectedActions: Array<{
      type: string;
      payload?: { id: string | undefined };
    }> = [
      { type: actionTypes.removeEmployeeRequest },
      { type: actionTypes.removeEmployeeSuccess, payload: { id: mockId } },
    ];

    await store.dispatch(removeEmployee(mockId));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
