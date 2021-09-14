import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';

export default function Routes() {
 return (
  <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/new" component={New} />
      <Route exact path="/edit/:id" component={Edit} /> 
  </Switch>
 );
}