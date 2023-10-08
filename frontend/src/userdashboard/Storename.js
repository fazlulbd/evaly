import React, { useContext, useEffect, useState } from 'react'
import { Alert, Col, Row, Form, Button, Table } from 'react-bootstrap'
import Sidebar from './Sidebar'
import { Store } from '../Store'
import axios from 'axios'
const Storename = () => {
  let { state } = useContext(Store)
  console.log(state)
  let [storename, setStorename] = useState('')
  let [store, setStore] = useState({})

  let handleStoreName = async (e) => {
    e.preventDefault()
    let { data } = await axios.post('http://localhost:8000/storename', {
      storename: storename,
      owner: state.userInfo._id,
      ownername: state.userInfo.name
    })
    console.log(data)
  }
  useEffect(() => {
    async function store() {
      let { data } = await axios.get(`http://localhost:8000/storename/${state.userInfo._id}`)
      setStore(data[0])
    } store()
  }, [state.userInfo._id])
  return (
    <>
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col lg={10}>
          <Alert variant='primary' className='text-center '>
            <h1> Welcome to Upload Product Page</h1>
          </Alert>
          <Row >
            <Col lg={10}>
              {
                store ?
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Store name</th>
                        <th>Owner name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>{store.storename}</td>
                        <td>{store.ownername}</td>
                        <td>
                          <Button variant="dark">Edit</Button>{' '}
                          <Button variant="danger">Delete</Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  :
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasic">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control type="text" onChange={(e) => setStorename(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleStoreName}> Submit </Button>
                  </Form>
              }
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Storename
