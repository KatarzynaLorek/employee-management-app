import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from '../NavBar/NavBar';
import TableView from '../../views/TableView/TableView';
import ChartView from '../../views/ChartView/ChartView';

const App: React.FC = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
      <Route exact path="/" component={TableView}></Route>
      <Route exact path="/charts" component={ChartView}></Route>
    </div>
  </BrowserRouter>
);

export default App;
