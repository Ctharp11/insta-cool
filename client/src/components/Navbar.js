import React, { Component } from 'react';
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';

class NavbarCom extends Component {
  constructor(props) {
    super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
      return (
          <div>
              <Navbar expand="md" className="mb-3 nav">
                <Container>
                    <NavbarBrand href="/"> <img className="nav-logo" src="/img/logo.png" alt="logo" /> </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                         <NavLink href="/account"> Your Account </NavLink>
                        </NavItem>
                    </Nav>
                    </Collapse>
                </Container>
              </Navbar>
          </div>
      )
  }
}

export default NavbarCom;