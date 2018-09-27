import React, { Component } from 'react';
import { getUserPosts } from '../services/utils';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            posts: []
        }
    }

    componentWillMount() {
        console.log(this.props)

    }

    componentDidUpdate() {
        const userID = this.props.userInfo.userInfo._id;
        // getUserPosts(userID)
        // .then(res => this.setState({ posts: res.data }))
        // .catch(err => console.log(err))
    }

    updatePostsState = () => {

    }

    render() {
        if (this.props.userInfo === '') {
            return null;
        }
        console.log(this.props.userInfo)
        const userInfo = this.props.userInfo.userInfo;
        return (
            <div>
              <div> Welcome {userInfo.facebook.first_name}!</div>
              <img src={userInfo.facebook.photo} alt='you' />
            </div>
        )
    }
}

export default Account;