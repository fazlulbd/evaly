import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Deal = () => {
    const [deal, setDeal] = useState([])
    useEffect(()=>{
        async function dealdata (){
            const {data} = await axios.get("http://localhost:8000/deal")
            setDeal(data)
        }
        dealdata ()
    },[])
    return (
        <>
            <Container>
                <Row className='deal-item'>
                    {
                        deal.map((item, index) => (
                            <Col lg={6}  key={item.id}>
                                <div className="deal-inner" style={{ background: `url(${item.img})` }}>
                                    <div className="deal-text">
                                        <p>{item.subheading}</p>
                                        <h3>{item.heading}</h3>
                                        <button className={`dealbtn${index}`}>{item.button}</button>
                                    </div>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </>
    )
}

export default Deal
