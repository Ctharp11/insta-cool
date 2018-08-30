import React, { Component } from 'react';
import { Container } from 'reactstrap';
class PhotoGrid extends Component {
    constructor() {
        super();
        this.state = {
            hearts: 30,
            comments: 5
        }
    }
    render() {
        const photoArray = ['boat.jpg', 'citrus.jpg', 'dog.jpg', 'friends.jpeg', 'jelly.jpg', 'leaf.jpg', 'mountain.jpg'];
        let randomPhoto = photoArray[Math.floor(Math.random() * photoArray.length)];
        return(
            <div className="post"> 
                <img className="post-img" src={`/img/${randomPhoto}`} alt="boat" />
                <Container>
                    <div className="post-description"> Tacos are good. Pizza is good. I like my friend. This may be an orange, or maybe you're orange. #hash #orange </div>
                    <div className="post-bottom"> 
                        <span className="post-btn post-like"> 
                            <img className="post-like-size" src="/img/heart.png" alt="heart" /> 
                            <span> {this.state.hearts} </span>
                        </span>
                        <span className="post-btn post-comments"> 
                            <img className="post-bubble" src="/img/bubble.png" alt="comments" /> 
                            <span> {this.state.comments} </span>
                        </span>
                    </div>
                </Container>
            </div> 
        )
    }
}

export default PhotoGrid;