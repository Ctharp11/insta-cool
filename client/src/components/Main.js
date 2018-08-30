import React, { Component } from 'react';
import PhotoGrid from './PhotoGrid';

class Main extends Component {
    render() {
        return(
            <div className="main"> 
                <PhotoGrid />
                <PhotoGrid />
                <PhotoGrid />
                <PhotoGrid />
            </div>
        )
    }
}

export default Main;