import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Container } from 'reactstrap';

import Main from './components/Main';
import NavbarCom from './components/Navbar';
import Account from './components/Account';
import Single from './components/Single';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="app">
        <NavbarCom />
        <Container>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/p/:id" component={Single} />
          </Switch>
        </Container>
      </div>  
    );
  }
}

export default App;
