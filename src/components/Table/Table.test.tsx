import React from 'react';
import { render } from '@testing-library/react';
import Table from './Table';
import { mockEmployeeData } from '../../mocks/employeeData';

const mockTableData = [
  mockEmployeeData,
  mockEmployeeData,
  mockEmployeeData,
  mockEmployeeData,
  mockEmployeeData,
];
const mockFn = jest.fn();
describe('Table component', () => {
  it('renders properly with 5 rows', () => {
    const container = render(
      <Table
        tableData={mockTableData}
        handleOpenUpdateForm={mockFn}
        handleRemoveEmployee={mockFn}
      />,
    );
    expect(container.baseElement).toMatchSnapshot();
  });

  it('renders properly with 3 rows', () => {
    const container = render(
      <Table
        tableData={mockTableData.slice(0, 3)}
        handleOpenUpdateForm={mockFn}
        handleRemoveEmployee={mockFn}
      />,
    );
    expect(container.baseElement).toMatchSnapshot();
  });
});
