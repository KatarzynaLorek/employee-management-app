import React from 'react';
import Input from './Input';
import { IResponseObject } from '../../types/responses';
import { render, fireEvent, waitFor } from '@testing-library/react';

const mockProps = {
  type: 'mockType',
  options: ['mockOption1', 'mockOption2'],
  label: 'mockLabel',
  containerClass: 'mockContainerClass',
  handleChange: jest.fn,
  isChartType: true,
};

describe('Input Element', () => {
  it('renders properly without isChartType props', () => {
    const container = render(
      <Input
        type={mockProps.type}
        options={mockProps.options}
        label={mockProps.label}
        containerClass={mockProps.containerClass}
        handleChange={mockProps.handleChange}
      />,
    );
    expect(container.baseElement).toMatchSnapshot();
  });
  it('renders properly with isChartType props', () => {
    const container = render(
      <Input
        type={mockProps.type}
        options={mockProps.options}
        label={mockProps.label}
        containerClass={mockProps.containerClass}
        handleChange={mockProps.handleChange}
        isChartType
      />,
    );
    expect(container.baseElement).toMatchSnapshot();
  });
});
