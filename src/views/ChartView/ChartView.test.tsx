import React from 'react';
import { render } from '@testing-library/react';
import ChartView from './ChartView';
import { mockEmployeeData } from '../../mocks/employeeData';

jest.mock('react-chartjs-2', () => ({
  Bar: () => null,
  Doughnut: () => null,
}));

describe('ChartView component', () => {
  it('renders properly', () => {
    const container = render(<ChartView employeesData={[mockEmployeeData]} />);
    expect(container.baseElement).toMatchSnapshot();
  });
});
