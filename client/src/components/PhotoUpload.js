import React, { Component } from 'react';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import keys from '../keys';
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
            loading: false
        }
    }

    upload = (e) => {
       
    }

    render(){
        return (
            <div> 
                <h3> Upload a Photo </h3>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                  <ModalHeader toggle={this.props.toggle}>Post</ModalHeader>
                    <Form onSubmit={this.handleSubmit} encType="multipart/form-data">
                        <ModalBody>
                        <FormGroup>
                            <Label for="exampleFile">File</Label>
                            <Input type="file" name="file" id="exampleFile" onChange={this.handleFile} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Description</Label>
                            <Input type="textarea" name="text" id="exampleText" onChange={this.handleChange} />
                            <CloudinaryContext cloudName="demo">
                            <Image publicId="sample">
                                <Transformation width="200" crop="scale" angle="10"/>
                            </Image>
                            </CloudinaryContext>
                        </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                        <Button type="submit" color="primary" onClick={this.props.toggle}>Submit</Button>
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

