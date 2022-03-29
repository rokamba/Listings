import React from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import Auth from './pages/Auth';
import Listings from './pages/Listings';
import Bookings from './pages/Bookings';

function App() {
  return (
    <BrowserRouter>
    <Switch>
    <Redirect from="/" to ="/auth" exact/>
    <Route path='/auth' component = {Auth}></Route>
    <Route path='/listing' component = {Listings}></Route>
    <Route path='/bookings' component = {Bookings}></Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
