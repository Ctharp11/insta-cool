import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import keys from '../keys';

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
      console.log('clicked');
      this.props.toggleLoginFun();
   }
  }

  responseFacebook = (response) => {
    console.log(response)
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
            appId={keys.FACEBOOK_APP_ID}
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