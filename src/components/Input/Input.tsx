import React from 'react';
import { ChartType, SortType } from '../../types/charts';
import './Input.scss';

interface ICommonInputProps {
  type: string;
  options: string[];
  label: string;
  containerClass: string;
}

interface IChartInputProps extends ICommonInputProps {
  chartType: true;
  changeType: (type: ChartType) => void;
}

interface ISortInputProps extends ICommonInputProps {
  chartType?: false;
  changeType: (type: SortType) => void;
}

type IInputProps = IChartInputProps | ISortInputProps;

const Input = (props: IInputProps): JSX.Element => {
  return (
    <div className={props.containerClass}>
      <label className="input_label" htmlFor={props.type}>
        {props.label}
      </label>
      <select
        className="input_select"
        name={props.type}
        onChange={(e) => {
          props.chartType
            ? props.changeType(e.target.value as ChartType)
            : props.changeType(e.target.value as SortType);
        }}
      >
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Input;
