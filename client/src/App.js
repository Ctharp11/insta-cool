import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router';
import { getPosts, getUser } from './services/utils';
import { 
  Alert,
  Container, 
} from 'reactstrap';
import { CSSTransition } from 'react-transition-group';

import Main from './components/Main';
import NavbarCom from './components/NavbarCom';
import Account from './components/Account';
import Single from './components/Single';
import PhotoUpload from './components/PhotoUpload';
import Login from './components/Login';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedin: false,
      userInfo: '',
      modal: false,
      file: '',
      text: '',
      success: false,
      error: false,
      posts: [],
      toggleLogin: false
    }
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
     getPosts()
    .then(res => this.setState({ posts: res.data}))
    .catch(err => console.log(err))

    const usertoken = localStorage.getItem('token');
    if (usertoken) {
      this.setState({ loggedin: true });
      getUser(usertoken)
      .then(res => this.setState({ userInfo: res.data, loggedin: true }))
      .catch(err => console.log(err))
    }
  }

  updateStatePost = (post) => {
    const newPostState = this.state.posts.concat(post)
    this.setState({ posts: newPostState });
  }

  getUserData = () => {
    const usertoken = localStorage.getItem('token');
    getUser(usertoken)
    .then(res => this.logginUser(res.data))
    .catch(err => console.log(err))
  }

  logginUser = (userInfo) => {
    this.setState({ 
      loggedin: true,
      userInfo
    });
    this.props.history.push('/account');
  }

  userLoggOut = () => {
    this.setState({ loggedin: false });
    localStorage.removeItem('token');
    this.props.history.push('/');
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleLoginFun = () => {
    this.setState({ toggleLogin: !this.state.toggleLogin });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
  }

  forbiddenUrl = (Component, props) => {
    if (this.state.loggedin) {
      return <Component {...props} />
    }
    return <Redirect to='/' />
  }

  render() {
    if (this.state.posts.length === 0) {
      return null;
    }
    if(this.state.loggedin && this.state.userInfo === '') {
      return null
    }

    const allProps = {
      props: this.props,
      posts: this.state.posts,
      getUserData: this.getUserData,
      loggedin: this.state.loggedin,
      userInfo: this.state.userInfo,
      browser: this.props,
      toggle:this.toggle,
      userLoggOut: this.userLoggOut,
      sendStatus: this.sendStatus,
      toggleLoginFun: this.toggleLoginFun
    }
    const { toggleLogin } =  this.state;
    return (
      <div className="app">
        <NavbarCom {...allProps} />
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
            <Route exact path="/" render={() => <Main {...allProps} />} />
            <Route exact path="/account" render={() => this.forbiddenUrl(Account, allProps)} />
            <Route exact path={"/p/:id"} render={() => <Single {...allProps} />} />
          </Switch>
          {this.state.modal &&
            <PhotoUpload 
              userInfo={this.state.userInfo}
              toggle={this.toggle}
              modal={this.state.modal}
              browser={this.props}
              updateStatePost={this.updateStatePost}
            />
          }
          </Container> 
          <CSSTransition
            in={toggleLogin}
            timeout={300}
            classNames="login-modal"
            unmountOnExit
            onExited={() => {
              this.setState({
                toggleLogin: false,
              });
          }}
        >
          {state => (
              <CSSTransition
                in={state === 'entered'}
                timeout={300}
                classNames="modal-tran"
                unmountOnExit
              >
                <div className="modal-tran"><Login {...allProps} /></div>
              </CSSTransition>
          )}
        </CSSTransition>
      </div>  
    );
  }
}

export default withRouter(App);
