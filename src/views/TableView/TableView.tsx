import React, { useState } from 'react';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';
import Table from '../../components/Table/Table';
import './TableView.scss';

const TableView: React.FC = () => {
  const [isAddFormOpen, setAddFormOpen] = useState(true);
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);

  const handleOpenUpdateForm = () => {
    setUpdateFormOpen(true);
  };

  return (
    <div className="tableview">
      {isAddFormOpen && <EmployeeForm formType="add" handleClose={() => setAddFormOpen(false)} />}
      {isUpdateFormOpen && (
        <EmployeeForm formType="update" handleClose={() => setUpdateFormOpen(false)} />
      )}
      <button
        className="tableview__button tableview__button--add"
        onClick={() => setAddFormOpen(true)}
      >
        Add
      </button>
      <Table handleOpenUpdateForm={handleOpenUpdateForm} />
      <div className="tableview__navigation">
        <button className="tableview__button ">Prev</button>
        <button className="tableview__button">Next</button>
      </div>
    </div>
  );
};

export default TableView;
