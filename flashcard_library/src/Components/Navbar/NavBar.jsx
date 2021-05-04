import React, { Component } from "react";
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {FaTwitter, FaFacebookSquare} from 'react-icons/fa';
import './NavBar.css'



class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    <Navbar className="navbar" collapseOnSelect expand="md" variant="dark">
    <Navbar.Brand href="/home">Flashcards</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/cards">Cards</Nav.Link>
        <Nav.Link href="/card-collections">Card Collections</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link><FaFacebookSquare/></Nav.Link>
        <Nav.Link ><FaTwitter/></Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
    );
  }
}

export default NavbarPage;