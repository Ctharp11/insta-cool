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
  Label, 
  Input
} from 'reactstrap';

class PhotoUpload extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            text: '',
            file: ''
        }
    }

    handleFile = (e) => {
        const { files } = e.target;
        this.setState({ file: files });
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
        const bodyInfo = {
            text: this.state.text,
            likes: 0
        }
        post(bodyInfo, this.state.file)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        this.props.toggle()
    }

    render(){
        return (
            <div> 
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                  <ModalHeader toggle={this.props.toggle}>Upload a Photo</ModalHeader>
                    <Form onSubmit={this.handleSubmit} encType="multipart/form-data">
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
                                <FormGroup className="preview-text">
                                  <Input type="textarea" name="text" id="exampleText" placeholder="Write a caption..." onChange={this.handleChange} /> </FormGroup>
                              </div>
                            }
                        </ModalBody>
                        <ModalFooter>
                        <Button type="submit" color="primary">Submit</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
                   
                {this.state.loading && (<div> Loading... </div>)}
                {this.state.photo
                    &&
                    <img src={this.state.photo} alt="insta-cool" />
                }
            </div>
        )
    }
}

export default PhotoUpload;

