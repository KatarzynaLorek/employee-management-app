import React from 'react';
import { render } from '@testing-library/react';
import Chart from './Chart';
import { mockEmployeeData } from '../../mocks/employeeData';

jest.mock('react-chartjs-2', () => ({
  Bar: () => null,
  Doughnut: () => null,
}));

describe('Chart component', () => {
  it('renders bar chart with sorting by department', () => {
    const container = render(
      <Chart sortType="department" chartType="bar" data={[mockEmployeeData]} />,
    );
    expect(container.baseElement).toMatchSnapshot();
  });
  it('renders bar chart with sorting by position', () => {
    const container = render(
      <Chart sortType="position" chartType="bar" data={[mockEmployeeData]} />,
    );
    expect(container.baseElement).toMatchSnapshot();
  });
  it('renders doughnut chart with sorting by department', () => {
    const container = render(
      <Chart sortType="department" chartType="doughnut" data={[mockEmployeeData]} />,
    );
    expect(container.baseElement).toMatchSnapshot();
  });
  it('renders doughnut chart with sorting by position', () => {
    const container = render(
      <Chart sortType="position" chartType="doughnut" data={[mockEmployeeData]} />,
    );
    expect(container.baseElement).toMatchSnapshot();
  });
});
