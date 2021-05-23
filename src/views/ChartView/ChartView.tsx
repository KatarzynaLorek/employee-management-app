import React, { useState } from 'react';
import './ChartView.scss';
import Chart from '../../components/Chart/Chart';
import Input from '../../components/Input/Input';
import { ChartType, SortType } from '../../types/charts';
import { IResponseObject } from '../../types/responses';

const inputOptions: { chartType: ChartType[]; sortType: SortType[] } = {
  chartType: ['bar', 'doughnut'],
  sortType: ['department', 'position'],
};

interface IChartView {
  employeesData: IResponseObject[];
}

const ChartView = ({ employeesData }: IChartView): JSX.Element => {
  const [sortType, setSortType] = useState<SortType>('department');
  const [chartType, setChartType] = useState<ChartType>('bar');

  const changeSortType = (type: SortType) => {
    setSortType(type);
  };

  const changeChartType = (type: ChartType) => {
    setChartType(type);
  };

  return (
    <div className="chartview">
      <div className="chartview_navbar">
        <Input
          isChartType
          type="chartInput"
          options={inputOptions.chartType}
          label="Chart Type"
          containerClass="chartview_input"
          handleChange={changeChartType}
        />
        <Input
          type="chartInput"
          options={inputOptions.sortType}
          label="Sort by"
          containerClass="chartview_input"
          handleChange={changeSortType}
        />
      </div>
      <div className="chartview_chartContainer">
        <Chart data={employeesData} sortType={sortType} chartType={chartType} />
      </div>
    </div>
  );
};
export default ChartView;
