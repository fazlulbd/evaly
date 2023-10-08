import axios from 'axios';
import React, { useState, useContext } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { Link, useNavigate  } from 'react-router-dom'
import { Store } from '../Store';

const Login = () => {
  const navigate = useNavigate()
  const {state, dispatch} = useContext(Store)

  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [emailerror, setEmailerror] = useState('')
  let [passworderror, setPassworderror] = useState('')
  let [show, setShow] = useState(false)
  
  let handleEmail = (e)=>{
    setEmail(e.target.value)
    setEmailerror('')
  }
  let handlePassword = (e)=>{
    setPassword(e.target.value)
    setPassworderror('')
  }

  let handleSubmit = async (e)=>{
    e.preventDefault()
    if(email === ''){
      setEmailerror('enter your email')
    }
    if(password === ''){
      setPassworderror('enter a password')
    }
    if(email && password){
      const {data} = await axios.post('http://localhost:8000/login',{
        email: email,
        password: password,
      })
      console.log(data)
      dispatch({type:'USER_LOGIN', payload: data.data})
      localStorage.setItem('userInfo', JSON.stringify(data.data))
      navigate('/')
    }
    
  }
  let handleShow = ()=>{
    setShow(!show)
  }
  return (
    <Container>
      <div className="">
        <Form>
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
            <Form.Control onChange={handlePassword} type={show ? 'text' : "password"} />
            {
              show ?
                <span><BsEye onClick={handleShow} /></span>
                :
                <span><BsEyeSlash onClick={handleShow} /></span>
            }
            {
              passworderror ?
                <Form.Text className="text-muted">{passworderror}</Form.Text>
                : ""
            }
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
          <div className=''>
            <Form.Text id="passwordHelpBlock" muted>
              Alredy have an account? <Link to="/registration">Sign Up</Link>
            </Form.Text>
          </div>
        </Form>
      </div>
    </Container>
  )
}

export default Login
