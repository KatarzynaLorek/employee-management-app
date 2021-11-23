import React, { useState } from 'react';
import './ChartView.scss';
import ChartView from './ChartView';
import { useAppSelector } from '../../hooks/reduxHooks';
import { IResponseObject } from '../../types/responses';
import { selectAll } from '../../store/reducers/employees';

const ChartViewContainer = (): JSX.Element => {
  const [data, setData] = useState<IResponseObject[]>([]);

  const employees = useAppSelector((state) => selectAll(state));

  setTimeout(() => setData(employees), 200);

  return <ChartView data={data} />;
};

export default ChartViewContainer;
