import React, { Component } from 'react';

class Account extends Component {
    constructor() {
        super();
        this.state = {
            account: ''
        }
    }
    render() {
        if (this.props.userInfo === '') {
            return null;
        }
        const userInfo = this.props.userInfo.userInfo;
        console.log(userInfo.facebook)
        return (
            <div>
              <div> Welcome {userInfo.facebook.first_name}!</div>
              <img src={userInfo.facebook.photo} alt='you' />
            </div>
        )
    }
}

export default Account;