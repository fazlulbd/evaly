import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const OfferProduct = () => {
    const [offer, setOffer] = useState({})

    useEffect(()=>{
        async function offerdata(){
          const {data} = await axios.get('http://localhost:8000/offer')
          setOffer(data)
        }
        offerdata()
    }, [])
  return (

       <Container fluid>
        <div className="product-bann" style={{background: `url(${offer.img})`}}>
            <Row>
                <Col md={{ span: 6, offset: 6 }}>  
                    <div className="banner-text">
                    <h1>{offer.heading}</h1>
                    <a href="#home">{offer.button}</a>
                    </div>
                </Col>
            </Row>
        </div>
      </Container>

  )
}

export default OfferProduct
