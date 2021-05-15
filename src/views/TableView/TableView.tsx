import React from 'react';
import Table from '../../components/Table/Table';
import './TableView.scss';

const TableView: React.FC = () => (
  <div className="tableview">
    <button className="tableview__button tableview__button--add">Add</button>
    <Table />
    <div className="tableview__navigation">
      <button className="tableview__button ">Prev</button>
      <button className="tableview__button">Next</button>
    </div>
  </div>
);

export default TableView;
