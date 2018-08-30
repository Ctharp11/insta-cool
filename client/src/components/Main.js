import React, { Component } from 'react';
import PhotoGrid from './PhotoGrid';

class Main extends Component {
    render() {
        const posts = this.props.data.posts
        return(
            <div className="main"> 
                {
                    posts.map(post => <PhotoGrid key={post._id} {...this.props} {...post} />)
                }
            </div>
        )
    }
}

export default Main;