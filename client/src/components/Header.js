import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => (
  <div>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="navbar-nav">
      <NavLink to="/" activeClassName="active" className="nav-item nav-link" exact={true}>Search</NavLink>
      <NavLink to="/saved" activeClassName="active" className="nav-item nav-link">Saved</NavLink>
    </div>
  </nav>
  
  <div className="row">
    <div className="col-sm">
      <div className="jumbotron">
        <h1>NYT React</h1>
        <h4>It does stuff!</h4>
      </div>
    </div>
  </div>
  </div>
)