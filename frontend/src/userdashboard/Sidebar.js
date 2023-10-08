import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link to='/dashboard' as={Link}>Dashboard</Nav.Link>
                <Nav.Link to='/uploadProduct' as={Link}>Product Upload</Nav.Link>
                <Nav.Link to='/storename' as={Link} >Create Store Name</Nav.Link>
            </Nav>
        </div>
    )
}

export default Sidebar
