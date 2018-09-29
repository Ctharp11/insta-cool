import React, { Component } from 'react';
import PhotoGrid from './PhotoGrid';

class Main extends Component {
    render() {
        const posts = this.props.posts
        let userId;
        if (this.props.loggedin) {
           userId = this.props.userInfo.userInfo._id; 
        }
        if (!this.props.loggedin) {
            userId = ''; 
        }
        
        return(
            <div className="main"> 
                {
                    posts.map(post => <PhotoGrid key={post._id} {...post} userid={userId} />)
                }
            </div>
        )
    }
}

export default Main;