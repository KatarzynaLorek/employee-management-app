import React from 'react';
import EmployeeForm from './EmployeeForm';
import { IResponseObject } from '../../types/responses';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { mockEmployeeData } from '../../mocks/employeeData';

const mockFn = jest.fn();
const mockNewID = '1';

describe('EmployeeForm component', () => {
  it('renders properly an add form', () => {
    const container = render(
      <EmployeeForm handleClose={mockFn} handleSubmit={mockFn} newID={mockNewID} />,
    );
    expect(container.baseElement).toMatchSnapshot();
  });

  it('renders properly an update form', () => {
    const container = render(
      <EmployeeForm employeeData={mockEmployeeData} handleClose={mockFn} handleSubmit={mockFn} />,
    );
    expect(container.baseElement).toMatchSnapshot();
  });

  it('runs close function when click on close button', () => {
    const { getByRole } = render(<EmployeeForm handleClose={mockFn} handleSubmit={mockFn} />);
    const closeBtn = getByRole('button', { name: 'closeButton' });
    fireEvent.click(closeBtn);
    expect(mockFn.mock.calls.length).toBe(1);
  });

  it('displays proper values', async () => {
    const { getByRole } = render(
      <EmployeeForm employeeData={mockEmployeeData} handleClose={mockFn} handleSubmit={mockFn} />,
    );

    const firstNameInput = getByRole('textbox', { name: 'First Name' });
    const lastNameInput = getByRole('textbox', { name: 'Last Name' });
    const positionInput = getByRole('combobox', { name: 'Position' });
    const departmentInput = getByRole('combobox', {
      name: 'Department',
    });

    const newMockData: IResponseObject = {
      firstName: 'newMockName',
      lastName: 'newMockName',
      position: 'senior',
      department: 'sales',
    };

    await waitFor(() => {
      fireEvent.change(firstNameInput, { target: { value: newMockData.firstName } });
      fireEvent.change(lastNameInput, { target: { value: newMockData.lastName } });
    });
    expect(firstNameInput).toHaveValue(newMockData.firstName);
    expect(lastNameInput).toHaveValue(newMockData.lastName);

    await waitFor(() => {
      fireEvent.change(departmentInput, { target: { value: newMockData.department } });
    });
    expect(departmentInput).toHaveValue(newMockData.department);

    await waitFor(() => {
      fireEvent.change(positionInput, {
        target: {
          value: newMockData.position,
        },
      });
    });
    expect(positionInput).toHaveValue(newMockData.position);
  });

  it('validates values on submit', async () => {
    const { container, getByRole } = render(
      <EmployeeForm handleClose={mockFn} handleSubmit={mockFn} />,
    );

    const submitButton = getByRole('button', { name: /submit/i });
    const firstNameInput = getByRole('textbox', { name: 'First Name' });
    const lastNameInput = getByRole('textbox', { name: 'Last Name' });

    await waitFor(() => {
      fireEvent.click(submitButton);
    });
    expect(container).toHaveTextContent('Required');

    const mockName = 'mockName';
    await waitFor(() => {
      fireEvent.change(firstNameInput, { target: { value: mockName } });
    });
    expect(container).toHaveTextContent('Required');

    await waitFor(() => {
      fireEvent.change(lastNameInput, { target: { value: mockName } });
    });
    expect(container).not.toHaveTextContent('Required');
  });
});
