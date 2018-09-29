import React, { Component } from 'react';
// import { getUserPosts } from '../services/utils';
import PhotoGrid from './PhotoGrid';

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            posts: []
        }
    }

    // componentDidMount() {
    //     const userID = this.props.userInfo.userInfo._id;
    //     getUserPosts(userID)
    //     .then(res => {
    //         this.setState({ posts: res.data }, this.dateSort)
    //     })
    //     .catch(err => console.log(err))
    // }

    // dateSort = () => {
    //     let posts = this.state.posts;
    //     if(posts && posts.length >= 1) {
    //        posts = posts.sort(function(a,b){
    //            return (b.date > a.date) ? 1 : (b.date < a.date) ? -1 : 0;
    //        });
    //        this.setState({ posts })
    //      }
    //      else if (posts.length === 0) {
    //        this.setState({ posts: [] })
    //      }
    //  }

    render() {
        if (this.props.userInfo === '') {
            return null;
        }
        const userInfo = this.props.userInfo.userInfo;
        const posts = this.props.posts;
        const userPostsArray =[];
        posts.map(post => {
            const userPosts = post.author.id.includes(userInfo._id);
            if (userPosts) {
                userPostsArray.push(post)
            }
            return post;
        })

        return (
            <div>
              <div className="account-head">
                <div className="account-head-img">
                  <img className="account-img" src={userInfo.facebook.photo} alt='you' />
                </div>
                <div className="account-head-right">
                  <div className="account-name">{userInfo.facebook.first_name} {userInfo.facebook.last_name}</div>
                  <div className="account-postsnum"> {userPostsArray.length} posts  </div>
                </div>
              </div>

              <div className="account-posts">
                <div className="main">
                {
                    userPostsArray.map(post => <PhotoGrid key={post._id} {...post} />)
                }
                 </div>
              </div>
            </div>
        )
    }
}

export default Account;