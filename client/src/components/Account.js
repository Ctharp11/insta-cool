import React, { Component } from 'react';

class Account extends Component {
    constructor() {
        super();
        this.state = {
            account: ''
        }
    }
    render() {
        if (!this.props.userInfo) {
            return null
        }
        return (
            <div>
              <div> Welcome {this.props.userInfo.first_name}!</div>
              <img src={this.props.userInfo.picture} alt='you' />
            </div>
        )
    }
}

export default Account;