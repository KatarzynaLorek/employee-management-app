import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import EmployeeForm from './EmployeeForm';

const renderAddForm = () => {
  const mockCloseFn = jest.fn();

  const utils = render(<EmployeeForm formType="add" handleClose={mockCloseFn} />);

  const form = utils.getByRole('form');

  const firstNameInput = utils.getByRole('textbox', { name: 'First Name' });
  const lastNameInput = utils.getByRole('textbox', { name: 'Last Name' });
  const positionInput = utils.getByRole('combobox', { name: 'Position' });
  const departmentInput = utils.getByRole('combobox', {
    name: 'Department',
  });

  const submitButton = utils.getByRole('button', {
    name: /submit/i,
  });
  const closeButton = utils.getByRole('button', { name: 'closeButton' });
  return {
    ...utils,
    mockCloseFn,
    form,
    submitButton,
    closeButton,
    firstNameInput,
    lastNameInput,
    positionInput,
    departmentInput,
  };
};

describe('EmployeeForm component', () => {
  it('renders properly', () => {
    const { form } = renderAddForm();
    expect(form).toBeInTheDocument();
  });

  it('renders different types of form', () => {
    const { submitButton, rerender, getByRole } = renderAddForm();
    expect(submitButton).toBeInTheDocument();

    rerender(<EmployeeForm formType="update" handleClose={() => jest.fn()} />);
    expect(getByRole('button', { name: /update/i })).toBeInTheDocument();
  });

  it('runs close function on click', () => {
    const { closeButton, mockCloseFn } = renderAddForm();
    fireEvent.click(closeButton);
    expect(mockCloseFn.mock.calls.length).toBe(1);
  });

  it('displays proper values', async () => {
    const { firstNameInput, lastNameInput, positionInput, departmentInput } = renderAddForm();

    const mockName = 'mockName';
    await waitFor(() => {
      fireEvent.change(firstNameInput, { target: { value: mockName } });
      fireEvent.change(lastNameInput, { target: { value: mockName } });
    });
    expect(firstNameInput).toHaveValue(mockName);
    expect(lastNameInput).toHaveValue(mockName);

    await waitFor(() => {
      fireEvent.change(departmentInput, { target: { value: 'IT' } });
    });
    expect(departmentInput).toHaveValue('IT');

    await waitFor(() => {
      fireEvent.change(positionInput, {
        target: {
          value: 'senior',
        },
      });
    });
    expect(positionInput).toHaveValue('senior');
  });

  it('validates values on submit', async () => {
    const { firstNameInput, lastNameInput, submitButton, container } = renderAddForm();

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
