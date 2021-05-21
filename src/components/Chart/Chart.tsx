import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useAppSelector } from '../../hooks/reduxHooks';
import { IResponseObject } from '../../types/responses';
import { ChartType, DepartmentType, PositionType, SortType } from '../../types/charts';

interface IChartProps {
  sortType: SortType;
  chartType: ChartType;
}

const Chart = ({ sortType, chartType }: IChartProps): JSX.Element => {
  const employees: IResponseObject[] = useAppSelector((state) => state.rootReducer.employees);

  const departments: DepartmentType[] = ['accountancy', 'IT', 'sales', 'marketing'];
  const positions: PositionType[] = ['junior', 'regular', 'senior', 'manager'];

  const employeesCountByKey = (
    sortType: 'department' | 'departmentOnly' | 'position' | 'positionOnly',
    firstSortKey: DepartmentType | PositionType,
    secondSortKey?: DepartmentType | PositionType,
  ): number => {
    switch (sortType) {
      case 'department':
        return employees
          .filter((employee) => employee.department === firstSortKey)
          .filter((employee) => employee.position === secondSortKey).length;
      case 'departmentOnly':
        return employees.filter((employee) => employee.department === firstSortKey).length;
      case 'position':
        return employees
          .filter((employee) => employee.position === firstSortKey)
          .filter((employee) => employee.department === secondSortKey).length;
      case 'positionOnly':
        return employees.filter((employee) => employee.position === firstSortKey).length;
    }
  };

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

  const BarChartData = {
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

  const DoughnutChartData = {
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
