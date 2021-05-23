import React from 'react';
import { render } from '@testing-library/react';
import ChartView from './ChartView';
import { mockEmployeeData } from '../../mocks/employeeData';

const mockFn = jest.fn();

describe('TableView component', () => {
  it('renders properly', () => {
    const container = render(<ChartView employeesData={[mockEmployeeData]} />);
    expect(container.baseElement).toMatchSnapshot();
  });
});
