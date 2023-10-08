import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const AdminSidebar = () => {
  return (
    <div className='sidebar'>
            <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link to='/adminDashboard' as={Link}>Dashboard</Nav.Link>
                <Nav.Link to='/adminCategory' as={Link}>category Name</Nav.Link>
                <Nav.Link to='/productPosition' as={Link}>Product Position</Nav.Link>
                <Nav.Link  >Create Store Name</Nav.Link>
            </Nav>
        </div>
  )
}

export default AdminSidebar
