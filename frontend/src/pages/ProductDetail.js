import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import { Store } from '../Store';

const ProductDetail = () => {
    const params = useParams()
    let [product, setProduct] = useState({})
    const { cartstate, cartdispatch } = useContext(Store)
    const { cart } = cartstate
    // console.log(product.color)
    const [activeColor, setActivecolor] = useState('')
    const [activeSize, setActivesize] = useState('')


    useEffect(() => {
        async function details() {
            let { data } = await axios.get(`http://localhost:8000/productDetails/${params.id}`)
            setProduct(data)
        } details()
    }, [params.id])

    let handleQuantity = (item, quantity)=>{
        cartdispatch({type:'CART_ADD_PRODUCT', payload: {...item, quantity}})
    }
    let handleCartProductAdd = (product)=>{
        const existingItem = cart.cartItems.find((item)=>item._id === product._id)
        const quantity = existingItem ? existingItem.quantity +1 : 1
        const color = activeColor
        const size =  activeSize

        cartdispatch({type:'CART_ADD_PRODUCT', payload: {...product, quantity, color, size}})
    }

    const { image, brand, name,price, description } = product

    return (
        <Container>
            <Row className='mt-5'>
                <Col lg={5}>
                    <img src={image} alt="" className='w-100' />
                </Col>
                <Col lg={5} className='mt-3'>
                    <p>brand: {brand}</p>
                    <h4>{name}</h4>
                    <h4 className='danger'>Price: {price}</h4>
                    <p className='d-flex'>
                        <ReactStars
                            count={5}
                            // value={item.rating}
                            size={24}
                            activeColor="#ffd700"
                            isHalf={true}
                            edit={false}
                        /><span className='px-3 py-2'>4 Reviews</span>
                    </p>
                    <p className='my-3'><span dangerouslySetInnerHTML={{ __html: description }}></span></p>
                    <div className="d-flex justify-content-between">
                        <p>
                            {
                                product.color?.map((colors, index) => (
                                    <span key={index} className={activeColor === colors ? 'product-color active-color' : 'product-color'} style={{ background: `#${colors}` }} onClick={() => setActivecolor(colors)}></span>
                                ))
                            }
                        </p>
                        <p>
                            {
                                product.size?.map((sizes, index) => (
                                    <span key={index} className={activeSize === sizes ? 'active-size' : "product-size"} onClick={() => setActivesize(sizes)}>{sizes}</span>
                                ))
                            }
                        </p>
                    </div>
                    <div className="">
                        {
                            cart.cartItems.map(item => (
                                item._id === params.id &&
                                <>
                                    <div className="d-flex mb-4" style={{ maxWidth: "180px" }}>
                                        <Button variant="outline-secondary" className="px-3 me-2" onClick={() => handleQuantity(item, item.quantity + 1)}>+</Button>
                                        <div className="form-outline">
                                            <input id="form1" min="0" name="quantity" value={item.quantity} type="number" className="form-control" onChange={() => null} />
                                        </div>
                                        <Button variant="outline-secondary" className="px-3 ms-2" onClick={() => handleQuantity(item, item.quantity > 1 ? item.quantity - 1 : item.quantity)}>-</Button>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                    <Card.Footer>
                        <Button className='add-to-cart' onClick={()=>handleCartProductAdd(product)}>Add to Cart</Button>
                    </Card.Footer>
                </Col>
                <Col lg={2}>
                </Col>
            </Row>

        </Container>
    )
}

export default ProductDetail
