import React, { Component } from 'react';
import { post } from '../services/utils';
import Dropzone from 'react-dropzone'
import { 
  Button,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Form, 
  FormGroup, 
  Input
} from 'reactstrap';
// import createBrowserHistory from 'history/createBrowserHistory';
// const history = createBrowserHistory({forceRefresh: true});

class PhotoUpload extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            text: '',
            file: '',
            loading: false
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    dropZoneHandler = (accepted, rejected) => {
        this.setState( {file: accepted} )
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        const bodyInfo = {
            text: this.state.text.trim(),
            likes: 0,
            author: this.props.userInfo.userInfo
        }
        post(this.state.file, bodyInfo)
        .then(res => {
            this.props.updatePhotoChange()
            this.finish()
        })
        .catch(err => err)
        // history.push('/account');
    }

    finish = () => {
        this.setState({ loading: false })
        this.props.toggle();
    }

    render(){
        return (
            <div> 
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                  <ModalHeader toggle={this.props.toggle}>Upload a Photo</ModalHeader>
                    <Form onSubmit={this.handleSubmit} encType="multipart/form-data">
                        
                        {this.state.loading
                            ?
                              <div className="loader">
                                <img className="loader-spinner" src='img/loader.gif' alt="loading" />
                                <div > Loading... </div>
                              </div>
                            :
                            <div>
                              <ModalBody>
                                <FormGroup>
                                <div>
                                    <Dropzone
                                        className="dropzone"
                                        multiple={false}
                                        accept="image/*"
                                        name="file"
                                        onDrop={this.dropZoneHandler} >
                                        <div className="dropzone-text"> Choose photo </div>
                                    </Dropzone>
                                </div>
                                </FormGroup>

                                {this.state.file !== '' &&
                                <div className="preview">
                                    <img className="preview-photo" src={this.state.file[0].preview} alt="preview" />
                                    <FormGroup className="preview-text modal-text">
                                    <Input type="textarea" name="text" id="exampleText" placeholder="Write a caption..." onChange={this.handleChange} /> </FormGroup>
                                </div>
                                }
                              </ModalBody>
                              <ModalFooter>
                                <Button type="submit" className="button">Submit</Button>
                              </ModalFooter>
                            </div>
                        }
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default PhotoUpload;

