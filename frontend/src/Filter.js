import React from 'react';

import './App.css';

function Filter({ changeChildVisibility, changeAdminVisibility }) {
  const onChildFilter = () => {
    changeChildVisibility();
  };

  const onAdminFilter = () => {
    changeAdminVisibility();
  };

  return (
    <div className="filter-container">
      <div className="filter-child" onClick={onChildFilter}>
        Child VIEW
      </div>

      <div className="filter-admin" onClick={onAdminFilter}>
        Admin VIEW
      </div>
    </div>
  );
}
export default Filter;
