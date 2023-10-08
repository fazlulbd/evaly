import React, { useEffect, useRef, useState } from 'react'
import { Alert, Col, Row, Form, Button } from 'react-bootstrap'
import Sidebar from './Sidebar'
import JoditEditor from 'jodit-react';
import axios from 'axios';


const UploadProduct = () => {

  const editor = useRef(null);
	const [content, setContent] = useState('');
  let [color, setColor] = useState([])

  let [productname, setProductname] = useState('')
  let [productbrand, setProductbrand] = useState('')
  let [productcategory, setProductcategory] = useState('')
  let [productcatprice, setProductcatprice] = useState('')
  let [productimg, setProductimg] = useState('')

  let [productnameError, setProductnameError] = useState('')
  let [productbrandError, setProductbrandError] = useState('')
  let [productcategoryError, setProductcategoryError] = useState('')
  let [productcatpriceError, setProductcatpriceError] = useState('')
  let [categoryname, setCategoryname] = useState([])

  
  
  let handleProductname = (e)=>{
      setProductname(e.target.value)
      setProductnameError('')
  }
  let handleProductbrand = (e)=>{
      setProductbrand(e.target.value)
      setProductbrandError('')
  }
  let handleProductcategory = (e)=>{
      setProductcategory(e.target.value)
      setProductcategoryError('')
  }
  let handleProductprice = (e)=>{
      setProductcatprice(e.target.value)
      setProductcatpriceError('')
  }



  let handleColor = (e)=>{
    let value = e.target.value
    if(value.split('').indexOf('#') !== -1){
      console.log('#  not allow')
    }else{
      setColor(value.split(','))
    }
  }

  const sizeArr = []

  let handleSizesmall = (e)=>{
      if(sizeArr.indexOf('S') !== -1){
        sizeArr.splice(sizeArr.indexOf('S'), 1)
      }else{
        sizeArr.push('S')
      }
  }
  let handleSizemedium = (e)=>{
    if(sizeArr.indexOf('M') !== -1){
      sizeArr.splice(sizeArr.indexOf('M'), 1)
    }else{
      sizeArr.push('M')
    }
  }
  let handleSizelarge = (e)=>{
    if(sizeArr.indexOf('L') !== -1){
      sizeArr.splice(sizeArr.indexOf('L'), 1)
    }else{
      sizeArr.push('L')
    }
  }
  let handleSizeextralarge = (e)=>{
    if(sizeArr.indexOf('Xl') !== -1){
      sizeArr.splice(sizeArr.indexOf('Xl'), 1)
    }else{
      sizeArr.push('Xl')
    }
  }

  let handleProductSubmit = async (e)=>{
    e.preventDefault()
    console.log(sizeArr)
    if(productname === ''){
      setProductnameError("! enter your product name")
    }
    if(productbrand === ''){
      setProductbrandError('! enter your brand name')
    }
    if(productcategory === ''){
      setProductcategoryError("! enter your category")
    }
    if(productcatprice === ''){
      setProductcatpriceError('! enter your product price')
    }

    let {data} = await axios.post('http://localhost:8000/product',{
        name: productname,
        brand: productbrand,
        category: productcategory,
        price: productcatprice,
        color: color,
        size: sizeArr,
        description: content,
        image: productimg,
        
    })
    console.log(data)

  }
  useEffect(()=>{
    async function category(){
      let {data} = await axios.get('http://localhost:8000/categoryname')
      setCategoryname(data)
    } category()
  },[])

  return (
    <>
       <Row>
        <Col lg={2}>
         <Sidebar/>
        </Col>
        <Col lg={10}>
          <Alert variant='primary' className='text-center '>
            <h2> Welcome to Upload Product Page</h2>
          </Alert>
          <h3 dangerouslySetInnerHTML={{__html: content}}></h3>

          <Row >
            <Col lg={10}>
              <Form>
              
                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control type="text" onChange={handleProductname}/>
                  {
                    productnameError ?
                      <Form.Text className="text-muted">{productnameError}</Form.Text>
                      : ""
                  }
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Product Brand</Form.Label>
                  <Form.Control type="text" onChange={handleProductbrand}/>
                  {
                    productbrandError ?
                      <Form.Text className="text-muted">{productbrandError}</Form.Text>
                      : ""
                  }
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Product Category</Form.Label>
                  {/* <Form.Control type="text" onChange={handleProductcategory}/> */}
                  <Form.Select aria-label="Default select example" onChange={handleProductcategory}>
                    <option>Open this select menu</option>
                    {
                      categoryname.map(item=>(
                        <option key={item._id} value={item.value}>{item.label}</option>
                      ))
                    }
                  </Form.Select>
                  {
                    productcategoryError ?
                    <Form.Text className="text-muted">{productcategoryError}</Form.Text>
                    :'' 
                  }
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Product Price</Form.Label>
                  <Form.Control type="text" onChange={handleProductprice}/>
                  {
                    productcatpriceError ?
                    <Form.Text className="text-muted">{productcatpriceError}</Form.Text>
                    : ''
                  }
                </Form.Group>
                 {/* ===================================================== */}
                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Product Description</Form.Label>
                  <JoditEditor
                    ref={editor}
                    value={content}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => {}}
                  />
                </Form.Group>
                {/* ==================================================== */}
                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label >Product Color</Form.Label>
                  <Form.Control type="text" onChange={handleColor}/>
                  {
                    color.length >0 &&
                    color.map((item, index) =>(
                      <span key={index} style={{width: '15px', height: '15px', borderRadius:'50%', background: `#${item}`, display:"inline-block", margin:'10px 3px'}}></span>
                    ))
                    
                  }
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Product Size</Form.Label>
                  <div className="d-flex">
                  <Form.Check type="checkbox" label="SM" onChange={handleSizesmall}/>{" "}
                  <Form.Check type="checkbox" label="MD" onChange={handleSizemedium}/>{" "}
                  <Form.Check type="checkbox" label="LG" onChange={handleSizelarge} />{" "}
                  <Form.Check type="checkbox" label="XL" onChange={handleSizeextralarge}/>{" "}
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="text" onChange={(e)=>setProductimg(e.target.value)}/>
                  {/* {
                    productcatpriceError ?
                    <Form.Text className="text-muted">{productcatpriceError}</Form.Text>
                    : ''
                  } */}
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleProductSubmit}>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default UploadProduct
