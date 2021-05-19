import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';
import Header from '../NavBar/NavBar';
import TableView from '../../views/TableView/TableView';
import ChartView from '../../views/ChartView/ChartView';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { fetchEmployeesData } from '../../store/actions/actions';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchEmployeesData()), [];
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route exact path="/" component={TableView}></Route>
        <Route exact path="/charts" component={ChartView}></Route>
      </div>
    </BrowserRouter>
  );
};

export default App;
