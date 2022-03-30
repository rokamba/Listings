import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Auth from './pages/Auth';
import Listings from './pages/Listings';
import Bookings from './pages/Bookings';
import NavBar from './components/NavBar/NavBar';
import Authentication from './context/authentication';

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });

  }
  logout = () => {
    this.setState({ token: null, userId: null });

  }
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Authentication.Provider value={{ token: this.state.token, userId: this.state.userId, login: this.login, logout: this.logout }}>
            <NavBar />

            <main className='content'>
              <Switch>
                {this.state.token && <Redirect from="/" to="/listing" exact />}
                {this.state.token && <Redirect from="/auth" to="/listing" exact />}

                {!this.state.token && <Route path='/auth' component={Auth}></Route>}
                <Route path='/listing' component={Listings}></Route>
                {this.state.token && <Route path='/bookings' component={Bookings}></Route>}
                {!this.state.token && <Redirect to="/auth" exact />}

              </Switch>
            </main>
          </Authentication.Provider>
        </React.Fragment>

      </BrowserRouter>
    );
  }
}

export default App;
