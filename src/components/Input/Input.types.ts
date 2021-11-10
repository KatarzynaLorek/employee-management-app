export enum InputVariant {
  sortingType = 'sortingType',
  chartType = 'chartType',
}

export interface IInput<T> {
  variant: InputVariant;
  options: string[];
  label: string;
  containerClass: string;
  handleChange: (type: T) => void;
}
