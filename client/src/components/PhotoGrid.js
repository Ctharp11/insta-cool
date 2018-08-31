import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        const item = this.props
        console.log(item)
        return(
            <div className="post"> 
                <Link to={`/p/${item._id}`}>
                <img className="post-img" src={`/img/${item.image}`} alt="wooo" />
                <Container>
                    <div className="post-description"> {item.description} </div>
                    <div className="post-bottom"> 
                        <span className="post-btn post-like"> 
                            <img className="post-like-size" src="/img/heart.png" alt="heart" /> 
                            <span> {item.hearts} </span>
                        </span>
                        <span className="post-btn post-comments"> 
                            <img className="post-bubble" src="/img/bubble.png" alt="comments" /> 
                            <span> {item.comments} </span>
                        </span>
                    </div>
                </Container>
                </Link>
            </div> 
        )
    }
}

export default PhotoGrid;