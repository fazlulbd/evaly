import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Product from './Product'
import { Link } from 'react-router-dom'

const TopProduct = () => {
    const [product, setProduct] = useState([])
    useEffect(()=>{
        async function productdata(){
            const {data} = await axios.get('http://localhost:8000/product')
            setProduct(data)
        }
        productdata()
    },[])
  return (
    <Container>
      <Row className='topproduct'>
      <Col className='topproduct-item' lg={6}>
            Top Product
        </Col>
        <Col lg={6}>
            <ul>
                <li><Link>All</Link></li>
                <li><Link>Boys Collection</Link></li>
                <li><Link>Girl Collection</Link></li>
                <li><Link>Shose Collection</Link></li>
            </ul>
        </Col>
      </Row>
      <Row>
        {
            product.map(item =>(
                <Product
                    key={item._id}
                    item ={item}
                />
            ))
        }
      </Row>
    </Container>
  )
}

export default TopProduct
