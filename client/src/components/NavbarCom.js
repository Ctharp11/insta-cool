import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import keys from '../keys';

class NavbarCom extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId      : keys.FACEBOOK_APP_ID,
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1'
        });
        window.FB.getLoginStatus(function(response) {
          return response;
        });
        window.FB.Event.subscribe('auth.statusChange', (response) => {
          if (response.authResponse) {
            window.FB.api('/me', { fields: 'last_name, first_name, name, email, picture' }, (user) => {
              this.updateLoggedInState(response, user)
            });
          }
          else {
            this.updateLoggedOutState()
          }
        }) 
      }.bind(this);
  
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  updateLoggedOutState = () => {
    this.props.userLoggOut();
    console.log('not logged in')
  }

  updateLoggedInState = (response, user) => {
    const userInfo = {
      name: user.name,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      picture: user.picture.data.url,
      fb_id: response.authResponse.userID,
      accessToken: response.authResponse.accessToken,
      expiresIn: response.authResponse.expiresIn,
      signedRequest: response.authResponse.signedRequest
    };
    this.props.userLoggedState(userInfo);
  }

  loggout = () => {
    console.log(window.FB.logout)
    window.FB.logout()
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
      return (
          <div className="nav"> 
            <div className=""> 
              <Link to="/"><img className="nav-logo" src="/img/logo.png" alt="logo" /> </Link>
            </div>
            <div className="nav-right">
              <div className="nav-item" onClick={this.props.toggle}> 
                Post 
              </div>
                  {this.props.loggedin 
                      ?
                      <div>
                        <div className="nav-item">
                          <Link to="/account"> My Account </Link>
                        </div> 
                        <div className="nav-item">
                          <div onClick={this.loggout}> Signout </div>
                        </div> 
                      </div>
                      :
                      <div>
                        <div className="nav-item">
                          <Link to="/login"> Login </Link>
                        </div> 
                      </div>
                  }
                
              </div>
          </div>
      )
  }
}

export default NavbarCom;