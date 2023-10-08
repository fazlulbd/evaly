import axios from 'axios';
import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { Link, useNavigate, } from 'react-router-dom'


const Registration = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [nameerror, setNameError] = useState('')
    const [emailerror, setEmailerror] = useState('')
    const [passworderror, setPassworderror] = useState('')
    const [show, setShow] = useState(false)


    const handleName = (e)=>{
        setName(e.target.value)
        setNameError('')
      }
      const handleEmail = (e)=>{
        setEmail(e.target.value)
        setEmailerror('')
      }
      const handlePassword = (e)=>{
        setPassword(e.target.value)
        setPassworderror('')
      }
  
      const handleSubmit = (e)=>{
        e.preventDefault()
        if(name === ''){
          setNameError('enter your name')
        }
        if(email === ''){
          setEmailerror('enter your email')
        }
        if(password === ''){
          setPassworderror('enter a password')
        }
        if(name && email && password){
          axios.post('http://localhost:8000/registration',{
            name: name,
            email: email,
            password: password,
          })
          navigate('/login')
        }
      }

      const handleShow = ()=>{
        setShow( !show )
      }
    return (
        <Container>
            <div className="">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control onChange={handleName} type="text" />
                        {
                            nameerror ?
                                <Form.Text className="text-muted">{nameerror}</Form.Text>
                                : ""
                        }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={handleEmail} type="email" />
                        {
                            emailerror ?
                                <Form.Text className="text-muted">{emailerror}</Form.Text>
                                : ""
                        }
                    </Form.Group>
                    <Form.Group className="mb-3 passworeshow" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={handlePassword} type={show ? "text" : "password"} />
                        <span >
                            {
                                show ?
                                    <BsEye onClick={handleShow} />
                                    :
                                    <BsEyeSlash onClick={handleShow} />
                            }
                        </span>
                        {
                            passworderror ?
                                <Form.Text className="text-muted">{passworderror}</Form.Text>
                                : ""
                        }
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                    <div className=''>
                        <Form.Text id="passwordHelpBlock" muted>
                            Alredy have an account? <Link to="/login">login</Link>
                        </Form.Text>
                    </div>
                </Form>
            </div>
        </Container>
    )
}

export default Registration

