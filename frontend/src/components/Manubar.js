import React, { useEffect, useState, useContext } from 'react'
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Store } from '../Store';

const Manubar = () => {
  const [logo, setLogo] = useState({})
  const { state, dispatch, cartstate} = useContext(Store)
  const {cart} = cartstate

  // console.log('ami stor theke manubar a', cart)
  

  useEffect(() => {
    async function logodata() {
      const { data } = await axios.get("http://localhost:8000/logo")
      setLogo(data)
    }
    logodata()
  }, [])
  const handleLogout = ()=>{
    dispatch({type: 'USER_LOGOUT'})
    localStorage.removeItem('userInfo')
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary main-manu">
      <Container>
        <Navbar.Brand href="#home"><img src={logo.img} alt="" /> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link to='/' as={Link}>Home</Nav.Link>
            <Nav.Link href="#link">Pages</Nav.Link>
            <Nav.Link href="#home">Blog</Nav.Link>
            <Nav.Link href="#link">Contact</Nav.Link>
          </Nav>
          <Nav className='manu-item' >
            {
              state.userInfo ?
                <Dropdown >
                  <Dropdown.Toggle id="dropdown-basic" className=' main-manu' variant="outline-secondary">{state.userInfo.name}</Dropdown.Toggle>
                  {
                    state.userInfo.isAdmin ?
                    <Dropdown.Menu>
                      <Dropdown.Item to='/adminDashboard' as={Link}>Go to dashboard</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>logout</Dropdown.Item>
                    </Dropdown.Menu>
                    :
                    <>
                    <Dropdown.Menu>
                    <Dropdown.Item >Action</Dropdown.Item>
                    <Dropdown.Item >Another action</Dropdown.Item>
                    {
                      state.userInfo.isVendor ?
                       <Dropdown.Item to='/dashboard' as={Link}>Go to dashboard</Dropdown.Item>
                      :
                       <Dropdown.Item to='/vendor' as={Link}>Become a vendor</Dropdown.Item>
                    }
                    
                    <Dropdown.Item onClick={handleLogout}>logout</Dropdown.Item>
                  </Dropdown.Menu>
                    </>
                  }
                </Dropdown>
                :
                <Nav.Link to='/login' as={Link}>sign up/ login</Nav.Link>
            }
            <Nav.Link ><BiUserCircle className='manu-icon' /></Nav.Link>
            <Nav.Link href="#link"><AiOutlineHeart className='manu-icon' /></Nav.Link>
            <Nav.Link to='cart' as={Link}><AiOutlineShoppingCart className='manu-icon' />
            {cart.cartItems.length > 0 ?
            <span>{cart.cartItems.length }</span>
            :
            ""
            }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Manubar
