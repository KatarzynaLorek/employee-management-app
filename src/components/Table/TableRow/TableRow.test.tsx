import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TableRow from './TableRow';
import { mockEmployeeData } from '../../../mocks/employeeData';

const mockFn1 = jest.fn();
const mockFn2 = jest.fn();

describe('TableRow component', () => {
  it('renders title row', () => {
    const container = render(<TableRow isTitle />);
    expect(container.baseElement).toMatchSnapshot();
  });

  it('renders normal row', () => {
    const container = render(
      <TableRow
        employeeData={mockEmployeeData}
        handleRemoveEmployee={mockFn1}
        handleOpenUpdateForm={mockFn2}
      />,
    );
    expect(container.baseElement).toMatchSnapshot();
  });

  it('runs update function when click on update button', () => {
    const { getByRole } = render(
      <TableRow
        employeeData={mockEmployeeData}
        handleRemoveEmployee={mockFn1}
        handleOpenUpdateForm={mockFn2}
      />,
    );
    const updateBtn = getByRole('button', { name: /update/i });
    fireEvent.click(updateBtn);
    expect(mockFn2.mock.calls.length).toBe(1);
  });

  it('runs remove function when click on delete button', () => {
    const { getByRole } = render(
      <TableRow
        employeeData={mockEmployeeData}
        handleRemoveEmployee={mockFn1}
        handleOpenUpdateForm={mockFn2}
      />,
    );
    const deleteBtn = getByRole('button', { name: /delete/i });
    fireEvent.click(deleteBtn);
    expect(mockFn1.mock.calls.length).toBe(1);
  });
});
