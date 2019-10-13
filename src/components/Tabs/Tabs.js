import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Tabs.scss';

const Tabs = () => {
  return (
    <div className="tabs row no-gutters justify-content-between align-items-end">
      <Link className="btn btn-primary mb-1" to="/create">Add New Item</Link>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <NavLink exact className="nav-link" activeClassName="active" to="/" role="tab">Pending</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/completed" role="tab">Completed</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/deleted" role="tab">Deleted</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Tabs;