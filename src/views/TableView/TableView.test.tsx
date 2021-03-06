import React from 'react';
import { render } from '@testing-library/react';
import TableView from './TableView';
import { mockEmployeeData } from '../../mocks/employeeData';

const mockFn = jest.fn();

describe('TableView component', () => {
  it('renders properly', () => {
    const container = render(
      <TableView
        employeesData={[mockEmployeeData]}
        handleAddEmployee={mockFn}
        handleUpdateEmployee={mockFn}
        handleRemoveEmployee={mockFn}
      />,
    );
    expect(container.baseElement).toMatchSnapshot();
  });
});
