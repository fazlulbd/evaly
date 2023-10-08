import React, { useContext, useState } from 'react'
import ReactStars from "react-rating-stars-component";
import { Button, Card, Col } from 'react-bootstrap'
import { Store } from '../Store';
import { Link } from 'react-router-dom';

const Product = ({ item }) => {
    const {cartstate, cartdispatch} = useContext(Store)
    const {cart} = cartstate
    console.log(cartstate)
    const [activeColor, setActivecolor] = useState('')
    const [activeSize, setActivesize] = useState('')

    let handleCartProductAdd = (product)=>{
        const existingItem = cart.cartItems.find((item)=>item._id === product._id)
        const quantity = existingItem ? existingItem.quantity +1 : 1
        const color = activeColor
        const size =  activeSize

        cartdispatch({type:'CART_ADD_PRODUCT', payload: {...product, quantity, color, size}})
    }
    return (
        <>
            <Col lg={3} className='mt-3'>
                <Card>
                    <Link to={`productDetails/${item._id}`}>
                        <Card.Img variant="top" src={item.image} />
                    </Link>
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                            <div className="d-flex justify-content-between">
                                <p>
                                    <ReactStars
                                        count={5}
                                        // value={item.rating}
                                        size={24}
                                        activeColor="#ffd700"
                                        isHalf={true}
                                        edit={false}
                                    />
                                </p>
                                <h6>{item.brand}</h6>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>
                                    {
                                        item.color.map((colors, index) => (
                                            <span key={index} className={activeColor === colors ? 'product-color active-color' : 'product-color'} style={{ background: `#${colors}` }} onClick={()=>setActivecolor(colors)}></span>
                                        ))
                                    }
                                </p>
                                <p>
                                    {
                                        item.size.map((sizes, index) => (
                                            <span key={index} className={activeSize === sizes ? 'active-size':"product-size"} onClick={()=>setActivesize(sizes)}>{sizes}</span>
                                        ))
                                    }
                                </p>
                                
                            </div>
                            <h5>Tk: {item.price}</h5>

                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button className='add-to-cart' onClick={()=>handleCartProductAdd(item)}>Add to Cart</Button>
                    </Card.Footer>
                </Card>
            </Col>
        </>
    )
}

export default Product
