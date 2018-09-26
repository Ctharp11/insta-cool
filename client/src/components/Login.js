import React, { Component } from 'react';
import keys from '../keys';

class Login extends Component {
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
    render() {
        return (
            <div> 
            <div className="">
                  <div 
                    className="fb-login-button" 
                    data-use-continue-as="true" 
                    data-width="40" 
                    data-max-rows="1" 
                    data-size="medium" 
                    data-show-faces="false" 
                    data-auto-logout-link="true"
                    data-scope="public_profile, email">
                  </div>
                </div> 

            </div>
        )
    }
}

export default Login;