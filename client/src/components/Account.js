import React, { Component } from 'react';
import { getUserPosts } from '../services/utils';
import PhotoGrid from './PhotoGrid';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            posts: []
        }
    }

    componentDidMount() {
        // console.log('component mounted') //not firing after post...how to get new state
        const userID = this.props.userInfo.userInfo._id;
        getUserPosts(userID)
        .then(res => this.setState({ posts: res.data }))
        .catch(err => console.log(err))
    }
    // componentDidUpdate() {
    //     console.log('componentDidUpdate', this.props.posts)
    //     this.props.posts.map(post => {
    //         const usersPosts = post.author.id.includes(this.props.userInfo.userInfo._id);
    //     })
    // }

    render() {
        if (this.props.userInfo === '') {
            return null;
        }
        const userInfo = this.props.userInfo.userInfo;
        return (
            <div>
              <div className="account-head">
                <div className="account-head-img">
                  <img className="account-img" src={userInfo.facebook.photo} alt='you' />
                </div>
                <div>
                  <span className="account-name">{userInfo.facebook.first_name} {userInfo.facebook.last_name}</span>
                  <span className="account-postsnum"> {this.state.posts.length} posts  </span>
                </div>
              </div>

              <div className="account-posts">
                <div className="main">
                {
                  this.state.posts.map(post => <PhotoGrid key={post._id} {...post} />)
                }
                 </div>
              </div>
            </div>
        )
    }
}

export default Account;