import React, { useState } from 'react'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import AdminSidebar from './AdminSidebar'
import axios from 'axios'
const ProductPosition = () => {
    let [name, setName] = useState('')

    let handlePosition = async (e)=>{
        e.preventDefault()
        let {data} = await axios.post('http://localhost:8000/productposition',{
            name: name,
            value: name,
        })
        console.log(data)
    }
  return (
    <Row>
    <Col lg={2}>
      <AdminSidebar />
    </Col>
    <Col lg={10}>
      <Alert variant="primary" className='mt-3 text-center'>
        <h2>Welcome To Product position page</h2>
      </Alert>
     <Row>
      <Col lg={10}>
      <Form>
        <Form.Group className="mb-3" controlId="formBasic">
          <Form.Label>position Name</Form.Label>
          <Form.Control type="text"  onChange={(e) => setName(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handlePosition}> Submit </Button>
      </Form>
      </Col>
     </Row>
    </Col>
  </Row>
  )
}

export default ProductPosition
