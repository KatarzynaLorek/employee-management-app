import React from 'react';
import { ChartType, SortType } from '../../types/charts';
import './Input.scss';
import { IInput } from './Input.types';

const Input = <T extends SortType | ChartType>(props: IInput<T>): JSX.Element => {
  return (
    <div className={props.containerClass}>
      <label className="input_label" htmlFor={props.variant}>
        {props.label}
      </label>
      <select
        className="input_select"
        name={props.variant}
        onChange={(e) => {
          props.handleChange(e.target.value as T);
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
