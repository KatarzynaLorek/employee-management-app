import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';
import Header from '../NavBar/NavBar';
import ChartViewContainer from '../../views/ChartView/ChartView.container';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { fetchEmployeesData } from '../../store/actions/actions';
import TableViewContainer from '../../views/TableView/TableView.container';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchEmployeesData()), [];
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route exact path="/" component={TableViewContainer}></Route>
        <Route exact path="/charts" component={ChartViewContainer}></Route>
      </div>
    </BrowserRouter>
  );
};

export default App;
