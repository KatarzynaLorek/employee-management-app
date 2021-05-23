import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { ChartType, DepartmentType, PositionType, SortType } from '../../types/charts';
import { IResponseObject } from '../../types/responses';

interface IChartProps {
  sortType: SortType;
  chartType: ChartType;
  data: IResponseObject[];
}

const Chart = ({ sortType, chartType, data }: IChartProps): JSX.Element => {
  const departments: DepartmentType[] = ['accountancy', 'IT', 'sales', 'marketing'];
  const positions: PositionType[] = ['junior', 'regular', 'senior', 'manager'];

  //Filter function
  const employeesCountByKey = (
    sortType: 'department' | 'departmentOnly' | 'position' | 'positionOnly',
    firstSortKey: DepartmentType | PositionType,
    secondSortKey?: DepartmentType | PositionType,
  ): number => {
    switch (sortType) {
      case 'department':
        return data
          .filter((employee) => employee.department === firstSortKey)
          .filter((employee) => employee.position === secondSortKey).length;
      case 'departmentOnly':
        return data.filter((employee) => employee.department === firstSortKey).length;
      case 'position':
        return data
          .filter((employee) => employee.position === firstSortKey)
          .filter((employee) => employee.department === secondSortKey).length;
      case 'positionOnly':
        return data.filter((employee) => employee.position === firstSortKey).length;
    }
  };

  //Data getters
  const getEmployeesByDepartmentOnly = (): number[] => {
    return departments.map((department) => employeesCountByKey('departmentOnly', department));
  };

  const getEmployeesByDepartment = (department: DepartmentType): number[] => {
    return positions.map((position) => employeesCountByKey('position', position, department));
  };

  const getEmployeesByPositionOnly = (): number[] => {
    return positions.map((position) => employeesCountByKey('positionOnly', position));
  };

  const getEmployeesByPosition = (position: PositionType): number[] => {
    return departments.map((department) => employeesCountByKey('department', department, position));
  };

  //Chart data objects
  const BarChartData = data && {
    labels:
      sortType === 'department'
        ? ['Accountancy', 'IT', 'Marketing', 'Sales']
        : ['Junior', 'Regular', 'Senior', 'Manager'],
    datasets: [
      {
        label: sortType === 'department' ? 'Junior' : 'Accountancy',
        data:
          sortType === 'department'
            ? getEmployeesByPosition('junior')
            : getEmployeesByDepartment('accountancy'),
        backgroundColor: ['#003f5c'],
      },
      {
        label: sortType === 'department' ? 'Regular' : 'IT',
        data:
          sortType === 'department'
            ? getEmployeesByPosition('regular')
            : getEmployeesByDepartment('IT'),
        backgroundColor: ['#7a5195'],
        borderWidth: 0,
      },
      {
        label: sortType === 'department' ? 'Senior' : 'Marketing',
        data:
          sortType === 'department'
            ? getEmployeesByPosition('senior')
            : getEmployeesByDepartment('marketing'),
        backgroundColor: ['#ef5675'],
        borderWidth: 0,
      },
      {
        label: sortType === 'department' ? 'Manager' : 'Sales',
        data:
          sortType === 'department'
            ? getEmployeesByPosition('manager')
            : getEmployeesByDepartment('sales'),
        backgroundColor: ['#ffa600'],
        borderWidth: 0,
      },
    ],
  };

  const DoughnutChartData = data && {
    labels:
      sortType === 'department'
        ? ['Accountancy', 'IT', 'Marketing', 'Sales']
        : ['Junior', 'Regular', 'Senior', 'Manager'],
    datasets: [
      {
        data:
          sortType === 'department' ? getEmployeesByDepartmentOnly() : getEmployeesByPositionOnly(),
        backgroundColor: ['#003f5c', '#7a5195', '#ef5675', '#ffa600'],
      },
    ],
  };

  return chartType === 'bar' ? (
    <Bar type="bar" data={BarChartData} options={{ maintainAspectRatio: false }} />
  ) : (
    <Doughnut type="doughnut" data={DoughnutChartData} options={{ maintainAspectRatio: false }} />
  );
};
export default Chart;
