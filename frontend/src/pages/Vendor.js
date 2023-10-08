import React, { useContext, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Store } from '../Store'
import axios from 'axios'

const Vendor = () => {
    const {state} = useContext(Store)
    console.log(state, 'ami vender state thaki')
    let [agree, setAgree] = useState(false)

    let handleVendor = ()=>{
        console.log('ami vendor theke')
        async function store(){
            let {data} = await axios.put(`http://localhost:8000/vendor/${state.userInfo._id}`)
            console.log(data)
            localStorage.removeItem('userInfo')
            localStorage.setItem('userInfo', JSON.stringify(data))
        } store()
    }
  return (
    <Container>
      <Row className='d-flax justify-content-center mt-5'>
        <Col lg={8}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore placeat ducimus delectus repellat totam quia dolores doloribus voluptates aperiam! Molestiae in sed incidunt, fuga doloremque asperiores excepturi a? Reprehenderit, obcaecati temporibus odit quis tempore sunt pariatur repellat voluptate ipsam, facilis ab ipsum ducimus illo beatae aut laborum accusamus rem provident!
            <Form.Group className="my-3" controlId="formBasicCheckbox">
                <Form.Check onChange={()=>setAgree(!agree)} type="checkbox" label="Accept the agreement" />
            </Form.Group>
            {
                agree ?
                <Button variant="success" onClick={handleVendor} >Become Vendor</Button>
                :
                <Button variant="success" disabled>Become Vendor</Button>
            }
            
        </Col>
      </Row>
    </Container>
  )
}

export default Vendor
