import React from 'react'
import { Alert, Col, Row } from 'react-bootstrap'
import Sidebar from './Sidebar'

const Dashboard = () => {
  return (
    <>
      <Row>
        <Col lg={2}>
            <Sidebar/>
        </Col>
        <Col lg={10}>
        <Alert  variant="primary" className='mt-3 text-center'>
          <h2>Welcome To Dashboard</h2>
        </Alert>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard
