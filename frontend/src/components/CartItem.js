import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Store } from '../Store'

const CartItem = ({item}) => {
    let {cartdispatch} = useContext(Store)
    // const {image, name, price, quantity} = item

    let handleQuantity = (item, quantity)=>{
        cartdispatch({type:'CART_ADD_PRODUCT', payload: {...item, quantity}})
    }
    return (
        <>
            <div className="row">
                <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                    <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                        <img src={item.image} className="w-100" alt="Blue Jeans Jacket" />
                    </div>
                </div>

                <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">

                    <p><strong>{item.name}</strong></p>
                    <p>Color: blue</p>
                    <p>Size: M</p>
                    <p>Tk: <strong>{(item.price)}</strong></p>
                    <button  className="btn btn-danger btn-sm me-1 my-2 px-5"> Remove </button>
                </div>

                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">

                    <div className="d-flex mb-4" style={{ maxWidth: "180px" }}>
                        <Button variant="outline-secondary" className="px-3 me-2" onClick={()=>handleQuantity(item.quantity + 1)}>+</Button>
                        <div className="form-outline">
                            <input id="form1" min="0" name="quantity" value={item.quantity} type="number" className="form-control" />
                        </div>
                        <Button variant="outline-secondary" className="px-3 ms-2" onClick={()=>handleQuantity(item.quantity - 1)}>-</Button>
                    </div>
                    <p className="text-start text-md-center">tk <strong>{(item.price * item.quantity)}</strong> </p>
                </div>
            </div>
            <hr className="my-4" />
        </>
    )
}

export default CartItem
