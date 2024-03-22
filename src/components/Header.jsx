import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function Header() {

    const navigate = useNavigate()


    const handleLogout = ()=>{
        sessionStorage.removeItem("token")
        navigate('/')
    }
  return (
    <>
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Login-System</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link ><button className='btn btn-primary'>Home</button></Nav.Link>
            <Nav.Link ><button className='btn btn-primary'>About</button></Nav.Link>
            <Nav.Link ><button className='btn btn-primary'>Contact us</button></Nav.Link>
            <Nav.Link ><button className='btn btn-warning' onClick={handleLogout}>Logout</button></Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header