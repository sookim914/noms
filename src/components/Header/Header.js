import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Emoji from 'react-emoji-render'
import logo from './logo.png'

const style = {
  color: '#6c6258',
  fontSize: '18px',
  fontFamily: 'Muli'
}

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#/" style={style}>search <Emoji text = ':mag:'/></Nav.Link>
    <Nav.Link href="#change-password" style={style}>change password</Nav.Link>
    <Nav.Link href="#sign-out" style={style}>sign out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up" style={style}>sign up</Nav.Link>
    <Nav.Link href="#sign-in" style={style}>sign in</Nav.Link>
  </Fragment>
)
//   <Nav.Link href="#places">Restuarants</Nav.Link>
// const alwaysOptions = (
//   <Fragment>
//     <Nav.Link to="/">Home</Nav.Link>
//   </Fragment>
// )

const Header = ({ user }) => (
  <Navbar collapseOnSelect style={{ backgroundColor: '#E58932' }} variant="dark" expand="md">
    <Navbar.Brand href="#">
      <img src={logo} style={{ width: '15vh', height: '15vh' }}/>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2" style={style}>welcome, {user.email}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
