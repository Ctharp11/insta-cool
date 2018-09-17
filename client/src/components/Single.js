import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import { getSinglePhoto } from '../services/utils';

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
            data: ''
        }
    }
    componentDidMount() {
        if (this.state.match) {
            getSinglePhoto(this.state.match)
            .then(res => {
                console.log(res.data)
                this.setState({ data: res.data })
            })
            // .then(response => {
            //     response.json()
            //     .then(data => ({data: data}))
            //     .then(res => console.log(res))
            // })
            // .catch(err => console.log(err))
        }
    }
    // heart = () => {
    //     this.setState({
    //         userLiked: !this.state.userLiked
    //     })
    //     if (this.state.userLiked){
    //         this.setState({ hearts: this.state.hearts - 1})
    //     }
    //     if (!this.state.userLiked){
    //         this.setState({ hearts: this.state.hearts + 1})
    //     }
        
    // }

    handleClick = () => {
        console.log('clicked')
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
                        <img className="single-user-image" src="/img/boat.jpg" alt="user" />
                        <span className="single-username"> Cameron Tharp </span>
                    </div>
                    <div> {data.text}  </div>
                    <hr />
                    <Form>
                        <FormGroup>
                         <img className="single-like-size" name="heart" src={this.state.userLiked ? "/img/heart.png" : "/img/heart_empty.png"} alt="heart" onClick={this.handleClick} /> 
                         <span> {data.likes} likes</span>
                        </FormGroup>
                    </Form>
                    <Form onSubmit={this.handleSumbit}>
                        <FormGroup>
                        <Input type="text" name="comment" id="exampleEmail" placeholder="Leave Comment.." onChange={this.handleChange} />
                    </FormGroup>
                    </Form>
                    <div className="single-comment-outer"> 
                      
                    </div>
                </div> 
            </div>
        )
    }
}

export default Single;