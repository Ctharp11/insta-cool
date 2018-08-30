import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { 
  Container, 
  Button,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Form, 
  FormGroup, 
  Label, 
  Input, 
  FormText
} from 'reactstrap';
import { withRouter } from 'react-router'

import Main from './components/Main';
import NavbarCom from './components/NavbarCom';
import Account from './components/Account';
import Single from './components/Single';
import data from './data.json';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data,
      modal: false,
      file: '',
      text: ''
    }
    this.toggle = this.toggle.bind(this);
  }
  passProps = (Component, props) => {
    return (
      <Component {...props} />
    )
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }
  render() {
    const allProps = {
      data: this.state.data,
    }
    return (
      <div className="app">
        <NavbarCom toggle={this.toggle} />
        <Container>
          <Switch>
            <Route exact path="/" render={() => this.passProps(Main, allProps)} />
            <Route exact path="/account" component={Account} />
            <Route exact path={"/p/:id"} render={() => this.passProps(Single, allProps)} />
          </Switch>
        </Container>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Post</ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody>
              <FormGroup>
                <Label for="exampleFile">File</Label>
                <Input type="file" name="file" id="exampleFile" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="exampleText">Description</Label>
                <Input type="textarea" name="text" id="exampleText" onChange={this.handleChange} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary" onClick={this.toggle}>Submit</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>  
    );
  }
}

export default withRouter(App);
