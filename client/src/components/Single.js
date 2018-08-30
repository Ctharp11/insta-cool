import React, { Component } from 'react';
import data from '../data.json';
import { Form, FormGroup, Input } from 'reactstrap';

class Single extends Component {
    constructor() {
        super();
        this.state = {
            hearts: 0,
            comments: [],
            comment: '',
            userLiked: false
        }
    }
    componentDidMount() {
        this.setState({ comments: data.comments })
        this.setState({ hearts: data.posts[0].hearts});
    }
    heart = () => {
        this.setState({
            userLiked: !this.state.userLiked
        })
        if (this.state.userLiked){
            this.setState({ hearts: this.state.hearts - 1})
        }
        if (!this.state.userLiked){
            this.setState({ hearts: this.state.hearts + 1})
        }
        
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSumbit = (e) => {
        e.preventDefault();
        this.setState({ comments: [this.state.comments, this.state.comment]});
        var newStateArray = this.state.comments.slice();
        newStateArray.push(this.state.comment);
        this.setState({ comments: newStateArray});
    }
    render() {
        const item = data.posts[0];
        return(
            <div className="single"> 
                <div className="single-left"> 
                    <img className="single-image" src={`/img/${item.image}`} alt="woo" />
                </div>
                <div className="single-right">
                    <div>
                        <img className="single-user-image" src="/img/boat.jpg" alt="user" />
                        <span className="single-username"> Cameron Tharp </span>
                    </div>
                    <div> {item.description} </div>
                    <hr />
                    <Form>
                        <FormGroup>
                         <img className="single-like-size" name="heart" src={this.state.userLiked ? "/img/heart.png" : "/img/heart_empty.png"} alt="heart" onClick={this.heart} /> 
                         <span> {this.state.hearts} likes</span>
                        </FormGroup>
                    </Form>
                    <Form onSubmit={this.handleSumbit}>
                        <FormGroup>
                        <Input type="text" name="comment" id="exampleEmail" placeholder="Leave Comment.." onChange={this.handleChange} />
                    </FormGroup>
                    </Form>
                    <div className="single-comment-outer"> 
                      {
                          this.state.comments.map((comment, index) => {
                              return (
                                <div key={index} className="single-commentsec">
                                  <span className="single-username"> {comment.username} </span> 
                                  <span> {comment.comment} </span>
                                </div>
                              )
                          })
                      }
                    </div>
                </div> 
            </div>
        )
    }

}

export default Single;