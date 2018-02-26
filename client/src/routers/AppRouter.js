import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

import Header from '../components/Header';
import SearchPage from '../components/SearchPage';
import SavedPage from '../components/SavedPage';


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={SearchPage} exact={true} />
        <Route path="/saved" component={SavedPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;