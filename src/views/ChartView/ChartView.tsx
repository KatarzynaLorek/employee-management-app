import React, { useState } from 'react';
import './ChartView.scss';
import Chart from '../../components/Chart/Chart';
import Input from '../../components/Input/Input';
import { ChartType, SortType } from '../../types/charts';
import { InputVariant } from '../../components/Input/Input.types';
import { IChartView } from './ChartView.types';

const ChartView: React.FC<IChartView> = ({ data }) => {
  const [sortType, setSortType] = useState<SortType>('department');
  const [chartType, setChartType] = useState<ChartType>('bar');

  const inputOptions: { chartType: ChartType[]; sortType: SortType[] } = {
    chartType: ['bar', 'doughnut'],
    sortType: ['department', 'position'],
  };

  const changeSortType = (type: SortType) => {
    setSortType(type);
  };

  const changeChartType = (type: ChartType) => {
    setChartType(type);
  };

  return (
    <div className="chartview">
      <div className="chartview_navbar">
        <Input<ChartType>
          variant={InputVariant.chartType}
          options={inputOptions.chartType}
          label="Chart Type"
          containerClass="chartview_input"
          handleChange={changeChartType}
        />
        <Input<SortType>
          variant={InputVariant.sortingType}
          options={inputOptions.sortType}
          label="Sort by"
          containerClass="chartview_input"
          handleChange={changeSortType}
        />
      </div>
      <div className="chartview_chartContainer">
        <Chart data={data} sortType={sortType} chartType={chartType} />
      </div>
    </div>
  );
};
export default ChartView;
