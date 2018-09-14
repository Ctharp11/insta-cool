import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { getPosts } from './services/utils';
import { 
  Alert,
  Container, 
} from 'reactstrap';

import Main from './components/Main';
import NavbarCom from './components/NavbarCom';
import Account from './components/Account';
import Single from './components/Single';
import PhotoUpload from './components/PhotoUpload';

import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      file: '',
      text: '',
      success: false,
      error: false,
      posts: []
    }
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    getPosts()
    .then(res => this.setState({ posts: res.data}))
    .catch(err => console.log(err))
}
  passProps = (Component, props) => {
    return (
      <Component {...props} />
    )
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }
  render() {
    return (
      <div className="app">
        <NavbarCom toggle={this.toggle} />
        {this.state.success && (
          <Alert color="success">
           Post successful
          </Alert>
          )
        }

        {this.state.error && (
          <Alert color="danger">
          Sorry, there was an error!
          </Alert>
          )
        }
       
        <Container>
          <Switch>
            <Route exact path="/" render={() => this.passProps(Main, {...this.props})} />
            <Route exact path="/account" component={Account} />
            <Route exact path={"/p/:id"} render={() => this.passProps(Single, {...this.props})} />
          </Switch>
          {this.state.modal &&
            <PhotoUpload 
              toggle={this.toggle}
              modal={this.state.modal}
            />
          }
        </Container>
      </div>  
    );
  }
}

export default withRouter(App);
