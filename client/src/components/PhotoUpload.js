import React, { Component } from 'react';
import S3FileUpload from 'react-s3';
import keys from '../keys';
 
//Optional Import
// import { uploadFile } from 'react-s3';
 
const config = {
    bucketName: 'insta-cool',
    dirName: 'photos', /* optional */
    region: 'us-east-1',
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
}

class PhotoUpload extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            photo: ''
        }
    }

    upload = (e) => {
        const file = e.target.files[0];
        this.setState({loading: true});
        S3FileUpload.uploadFile(file, config)
        .then(data => {
            if (data) {
                this.setState({
                    loading: false,
                    photo: data.location
                })
            }
        })
        .catch(err => console.error(err))
    }

    render(){
        return (
            <div> 
                <h3> Upload a Photo </h3>
                <input 
                    type="file"
                    onChange={this.upload}
                      />
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

