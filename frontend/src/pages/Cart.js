import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../Store'
import { Button, Form } from 'react-bootstrap'
const Cart = () => {
    const { cartstate, cartdispatch } = useContext(Store)
    const { cart } = cartstate
    let [total, setTotal] = useState('')
    let [shipping, setShipping] = useState('')

    let handleQuantity = (item, quantity)=>{
        cartdispatch({type:'CART_ADD_PRODUCT', payload: {...item, quantity}})
    }
    let handleRemoveCart = (item)=>{
        cartdispatch({type:'CART_REMOVE_PRODUCT', payload: item})
    }
    let handleClearCart = ()=>{
        cartdispatch({type:'CLEAR_CART'}) 
    }
    useEffect(()=>{
        let price = 0
      cart.cartItems.map(item =>{
        price += item.price * item.quantity 
    }) 
    setTotal(price)
    if(price < 600){
        setShipping(40)
    }else if(price > 600){
        setShipping(30)
    }else{
        setShipping(0) 
    }
      
    },[cart.cartItems])
    return (
      <>
      {
        cart.cartItems.length > 0 ?
        <section className="h-100 gradient-custom">
        <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
                <div className="col-md-8">
                    <div className="card mb-4">
                        <div className="card-header py-3">
                            <h5 className="mb-0">Cart Item {cart.cartItems.length}</h5>
                        </div>
                        <div className="card-body">
                            {
                                cart.cartItems.map(item => (
                                    <>
                                        <div className="row" key={item._id}>
                                            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                                <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                    <img src={item.image} className="w-100" alt="Blue Jeans Jacket" />
                                                </div>
                                            </div>

                                            <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">

                                                <p><strong>{item.name}</strong></p>
                                                <p>Color:<span style={{ width: '15px', height: '15px', borderRadius:'50%', display:"inline-block",  background: `#${item.color}`, margin:'-3px 5px' }}></span></p>
                                                {/* style={{width: '15px', height: '15px', borderRadius:'50%', background: `#${item}`, display:"inline-block", margin:'-10px 3px'}} */}
                                                <p>Size: {item.size}</p>
                                                <p>Tk: <strong>{(item.price)}</strong></p>
                                                <Button className="btn btn-danger btn-sm me-1 my-2 px-5" onClick={()=>handleRemoveCart(item)}> Remove </Button>
                                            </div>

                                            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">

                                                <div className="d-flex mb-4" style={{ maxWidth: "180px" }}>
                                                    <Button variant="outline-secondary" className="px-3 me-2" onClick={()=>handleQuantity(item, item.quantity + 1)}>+</Button>
                                                    <div className="form-outline">
                                                        <input id="form1" min="0" name="quantity" value={item.quantity} type="number" className="form-control" onChange={() => null} />
                                                    </div>
                                                    <Button variant="outline-secondary" className="px-3 ms-2" onClick={()=>handleQuantity(item, item.quantity >1 ? item.quantity - 1 : item.quantity )}>-</Button>
                                                </div>
                                                <p className="text-start text-md-center">tk <strong>{(item.price * item.quantity)}</strong> </p>
                                            </div>
                                            <hr className="my-4" />
                                        </div>
                                        
                                    </>
                                ))
                            }
                            <Button variant="danger" onClick={handleClearCart}>Clear Cart</Button> {' '}
                            <Button  variant="secondary" >Update Cart</Button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-header py-3">
                            <h5 className="mb-0">Summary</h5>
                        </div>
                        <div className="card-body">
                            <div className="input-from px-4 py-5">
                                <Form.Group className="mb-3" controlId="formBasic">
                                    <Form.Control type="text" placeholder="distick" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasic">
                                    <Form.Control type="text" placeholder="thana" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasic">
                                    <Form.Control type="text" placeholder="address" />
                                </Form.Group>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li
                                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                    Products
                                    <span>Tk: {total}</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Shipping
                                    <span>{shipping}</span>
                                </li>
                                <li
                                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                    <div>
                                        <strong>Total amount</strong>
                                        <strong>
                                            <p className="mb-0">(including VAT)</p>
                                        </strong>
                                    </div>
                                    <span><strong>Tk: {total + shipping}</strong></span>
                                </li>
                            </ul>

                            <Button type="button" className="btn btn-primary btn-lg btn-block">  Go to checkout </Button>{' '}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    :'cart empty'
      }
      </>
    )
}

export default Cart
