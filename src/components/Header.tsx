import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import EditPassword from './EditPassword';

function Header() {

  const navigate = useNavigate()

  const changePassword = ()=>{

  }

  const handleLogout = () => {
    sessionStorage.removeItem("token")
    navigate('/')
  }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="">
        <Container>
          <Navbar.Brand ><Link  to={'/home'}className='text-white' style={{textDecoration:'none'}}>Login-System</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link ><Link to={'/home'}><button className='btn btn-primary'>Home</button></Link></Nav.Link>
              {/* <Nav.Link ><button className='btn btn-primary'>About</button></Nav.Link>
            <Nav.Link ><button className='btn btn-primary'>Contact us</button></Nav.Link> */}
              <Nav.Link ><EditPassword/></Nav.Link>

              <Nav.Link ><button className='btn btn-warning w-100' onClick={handleLogout}>Logout</button></Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header