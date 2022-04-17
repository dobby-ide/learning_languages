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
      <div>
        <div className="filter-btn" onClick={onChildFilter}>
          Child VIEW
        </div>
      </div>

      <div>
        <div className="filter-btn" onClick={onAdminFilter}>
          Admin VIEW
        </div>
      </div>
    </div>
  );
}
export default Filter;
