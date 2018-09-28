import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { postUser } from '../services/utils';

class Login extends Component {

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  handleClick = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.toggleLoginFun();
   }
  }

  responseFacebook = (response) => {
    const token = response.accessToken;
    postUser(token)
    .then(res =>  {
      localStorage.setItem('token', res.data.token) 
      this.props.getUserData();
    })
    .catch(err => console.log('axios err', err))
  }

  componentClicked = () => {     
    this.props.toggleLoginFun();
  }

  render() {
    return (  
      <div className="login-modal"> 
        <div className="modalz" ref={this.setWrapperRef}>
          <div className="modalz-x" onClick={this.props.toggleLoginFun}> X </div>

          <div className="modalz-header"> Welcome back! </div>
          <div className="modalz-subhead"> Sign in to be able to view, post, and like photos from around the world. </div>
          <div className="modalz-button"> 
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook} />             
          </div> 
        </div>
      </div>
    )
  }
}

export default Login;