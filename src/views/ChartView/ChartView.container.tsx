import React, { useEffect, useState } from 'react';
import './ChartView.scss';
import ChartView from './ChartView';
import { useAppSelector } from '../../hooks/reduxHooks';
import { IResponseObject } from '../../types/responses';

const ChartViewContainer = (): JSX.Element => {
  const [data, setData] = useState<IResponseObject[]>([]);

  const employees: IResponseObject[] = useAppSelector((state) => state.rootReducer.employees);

  setTimeout(() => setData(employees), 200);

  return <ChartView employeesData={data} />;
};

export default ChartViewContainer;
