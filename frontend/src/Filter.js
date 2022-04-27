import React from 'react';

import './App.css';

function Filter({
  changeChildVisibility,
  changeAdminVisibility,
  changeRegisterVisibility,
}) {
  const onChildFilter = () => {
    changeChildVisibility();
  };

  const onAdminFilter = () => {
    changeAdminVisibility();
  };
  const onRegisterFilter = () => {
    changeRegisterVisibility();
  };

  return (
    <div className="filter-container">
      <div className="filter-child" onClick={onChildFilter}>
        Child
      </div>

      <div className="filter-admin" onClick={onAdminFilter}>
        Admin
      </div>
      <div className="filter-register" onClick={onRegisterFilter}>
        Log in / Sign up
      </div>
    </div>
  );
}
export default Filter;
