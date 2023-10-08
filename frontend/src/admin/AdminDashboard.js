import React from 'react'
import { Alert, Col, Row } from 'react-bootstrap'
import AdminSidebar from './AdminSidebar'
const AdminDashboard = () => {
  return (
    <Row>
        <Col lg={2}>
            <AdminSidebar/>
        </Col>
        <Col lg={10}>
        <Alert  variant="primary" className='mt-3 text-center'>
          <h2>Welcome To Dashboard</h2>
        </Alert>
        </Col>
      </Row>
  )
}

export default AdminDashboard
