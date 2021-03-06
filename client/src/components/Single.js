import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import { getSinglePhoto, likePost, commentPost } from '../services/utils';

class Single extends Component {
    constructor(props) {
        super(props);
        const match = props.props.location.pathname;
        this.state = {
            match: match.slice(3, match.length ) ? match.slice(3, match.length ) : null,
            hearts: 0,
            comments: [],
            comment: '',
            userLiked: false,
            data: '',
            error: ''
        }
    }
    componentDidMount() {
        if (this.state.match) {
            getSinglePhoto(this.state.match)
            .then(res => {
                this.setState({ 
                    data: res.data,
                    hearts: res.data[0].likes,
                    userLiked: this.props.loggedin ? res.data[0].likedBy.includes(this.props.userInfo.userInfo._id) : false,
                    comments: res.data[0].comments.text
                 })
            })
            .catch(err => console.log(err))
        }
    }
    heart = () => {
        if(this.props.loggedin) {
            if (!this.state.userLiked) {
                likePost(this.state.match, this.props.userInfo.userInfo._id, 'liked')
                .then(res => {
                    this.setState({ userLiked: true, hearts: this.state.hearts + 1 })
                    this.props.updatePhotoChange()
                    return res
                })
                .catch(err => console.log(err)) 
            }
            
            if (this.state.userLiked) {
                likePost(this.state.match, this.props.userInfo.userInfo._id, 'disliked')
                .then(res => {
                    this.setState({ userLiked: false, hearts: this.state.hearts - 1 })
                    this.props.updatePhotoChange()
                    return res
                })
                .catch(err => console.log(err)) 
            }
        }
        if (!this.props.loggedin) {
            this.setState({error: 'You must be logged in to like a post!'})
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSumbit = (e) => {
        e.preventDefault();
        if (this.props.loggedin) {
            const userInfo = {
                id: this.props.userInfo.userInfo._id,
                first_name: this.props.userInfo.userInfo.facebook.first_name,
                last_name: this.props.userInfo.userInfo.facebook.last_name,
                text: this.state.comment
            }
            commentPost(this.state.match, userInfo)
            .then(res => {
                this.props.updatePhotoChange();
                console.log(res)
                return res;
            })
            const newComment = `${this.props.userInfo.userInfo.facebook.first_name} ${this.props.userInfo.userInfo.facebook.last_name} ${this.state.comment}`;
            const commentUpdate = this.state.comments.concat(newComment)
            this.setState({ comments: commentUpdate, comment: ''});
            const commentInput = document.querySelector('#comment-input');
            commentInput.value = '';
        }
        if (!this.props.loggedin) {
            this.setState({error: 'You must be logged in to comment on a post!'})
        }
    }
    render() {
        if (!this.state.data) {
            return null;
        }
        const data = this.state.data[0];
        return(
            <div className="single"> 
                <div className="single-left"> 
                    <img className="single-image" src={data.file} alt={data.file_id} />
                </div>
                <div className="single-right">
                    <div>
                        <img className="single-user-image" src={data.author.photo} alt="user" />
                        <span className="single-username"> {data.author.first_name} {data.author.last_name} </span>
                    </div>
                    <div> {data.text}  </div>
                    <hr />
                    <Form>
                        <FormGroup>
                         {this.state.error === 'You must be logged in to like a post!' && <div> {this.state.error} <span className="error-x" onClick={() => this.setState({ error: '' })}> X </span> </div>}
                         <img className="single-like-size" name="heart" src={this.state.userLiked ? "/img/heart.png" : "/img/heart_empty.png"} alt="heart" onClick={this.heart} /> 
                         <span> {this.state.hearts} likes</span>
                        </FormGroup>
                    </Form>
                    <Form onSubmit={this.handleSumbit} className="comment-form">
                        <div className="comment-flex">
                        <FormGroup>
                          {this.state.error === 'You must be logged in to comment on a post!' && <div> {this.state.error} <span className="error-x" onClick={() => this.setState({ error: '' })}> X </span> </div>}
                          <Input className="comment-input" type="text" name="comment" id="comment-input" placeholder="Leave Comment.." onChange={this.handleChange} />
                        </FormGroup>
                        <button className="comment-button">+</button>
                        </div>
                    </Form>
                    <div className="single-comment-outer"> 
                    {this.state.comments.map(
                        (comment,index) => <div key={index}> {comment} </div>)
                    }
                      
                    </div>
                </div> 
            </div>
        )
    }
}

export default Single;