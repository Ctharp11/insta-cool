import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Container } from 'reactstrap';

import Main from './components/Main';
import NavbarCom from './components/Navbar';
import Account from './components/Account';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="app">
        <NavbarCom />
        <Container>
          <Switch>
            <Route path="/" component={Main} />
            <Route path="/account" component={Account} />
            <Route path="/photo/:id" component={Main} />
          </Switch>
        </Container>
      </div>  
    );
  }
}

export default App;
