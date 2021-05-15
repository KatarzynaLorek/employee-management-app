import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

const renderApp = () => {
  const utils = render(<App />);
  const tableButton = utils.getByText(/table/i);
  const chartButton = utils.getByText(/charts/i);
  const title = utils.getByText('Employee management app');
  return { ...utils, tableButton, chartButton, title };
};

describe('App Component', () => {
  it('renders app without crashing', () => {
    const { title } = renderApp();
    expect(title).toBeInTheDocument();
  });

  it('changes active button', () => {
    const activeClass = 'navbar__button navbar__button--active';
    const { tableButton, chartButton, title } = renderApp();

    fireEvent.click(chartButton);
    expect(chartButton).toHaveClass(activeClass);

    fireEvent.click(tableButton);
    expect(chartButton).not.toHaveClass(activeClass);
    expect(tableButton).toHaveClass(activeClass);

    fireEvent.click(chartButton);
    fireEvent.click(title);
    expect(chartButton).not.toHaveClass(activeClass);
    expect(tableButton).toHaveClass(activeClass);
  });

  it('changes views', () => {
    const { tableButton, chartButton, title, container, getByText } = renderApp();

    fireEvent.click(chartButton);
    expect(getByText('Chart view')).toBeInTheDocument();

    fireEvent.click(tableButton);
    expect(container).not.toHaveTextContent('Chart view');
    expect(getByText('Add')).toBeInTheDocument();

    fireEvent.click(chartButton);
    expect(container).not.toHaveTextContent('Add');

    fireEvent.click(title);
    expect(container).not.toHaveTextContent('Chart view');
    expect(screen.getByText('Add')).toBeInTheDocument();
  });
});
