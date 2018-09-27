import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavbarCom extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
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
              <div className="nav-item" onClick={() => {this.props.loggedin ? this.props.toggle() : this.props.toggleLoginFun()}}> 
                Post 
              </div>
                  {this.props.loggedin 
                      ?
                      <div>
                        <div className="nav-item">
                          <Link to="/account"> My Account </Link>
                        </div> 
                        <div className="nav-item">
                          <div onClick={this.props.userLoggOut}> Sign out </div>
                        </div> 
                      </div>
                      :
                      <div>
                        <div className="nav-item">
                          <div onClick={this.props.toggleLoginFun}> Sign in </div>
                        </div> 
                      </div>
                  }
                
              </div>
          </div>
      )
  }
}

export default NavbarCom;