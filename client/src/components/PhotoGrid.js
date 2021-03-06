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
        const item = this.props;
        const userid = item.userid;
        const likedBy = item.likedBy
        return(
            <div className="post"> 
              <Link to={`/p/${item._id}`}>
              <img className="post-img" src={item.file} alt={item._id} />
              <Container>
                <div className="post-description"> {item.text} </div>
                <div className="post-bottom"> 
                    <span className="post-btn post-like"> 
                        <img className="post-like-size" src={likedBy.includes(userid) ? '/img/heart.png' : '/img/heart_empty.png'} alt="heart" /> 
                        <span> {item.likes} </span>
                    </span>
                    <span className="post-btn post-comments"> 
                        <img className="post-bubble" src="/img/bubble.png" alt="comments" /> 
                        <span> {item.comments.text.length}  </span>
                    </span>
                </div>
              </Container>
              </Link>
            </div> 
        )
    }
}

export default PhotoGrid;