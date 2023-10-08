const express = require('express')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const logoData = require('./logoData')
const bannerData = require('./bannerData')
const dealData = require('./dealData')
// const productData = require('./productData')
const offerData = require('./offerData')
const User = require('./model/usermodel.js')
const Storename = require('./model/storenameModel.js')
const Product = require('./model/uploadProduct.js')
const Categoryname = require('./model/categoryModel.js')
const Productposition = require('./model/productPositionModel.js')

var cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb+srv://mern:Fazlul99@cluster0.w78ncz9.mongodb.net/evaly?retryWrites=true&w=majority');

app.get('/', function (req, res) {
  res.send('Hello Programer')
})

app.get('/logo', function (req, res) {
  res.send(logoData)
})
app.get('/banner', function (req, res) {
  res.send(bannerData)
})
app.get('/deal', function (req, res) {
  res.send(dealData)
})

app.get('/offer', function (req, res) {
  res.send(offerData)
})
app.post('/registration', function (req, res) {
  bcrypt.hash(req.body.password, 10).then(function(hash) {
    // Store hash in your password DB.
    let userInfo = {
      name: req.body.name,
      email: req.body.email,
      password: hash
    }
     const user = new User(userInfo)
     user.save()
  });
})
app.post('/login', async (req, res)=>{
  const data = await User.find({email: req.body.email})
 if(data[0]){
  bcrypt.compare(req.body.password, data[0].password).then(function(result) {
    // result == true
    if(result){
      res.send({data:data[0], msg:'Login successfull'})
    }else{
      res.send('Password Not match')
    }
    
  });
 }else{
  res.send('Email Not Found')
 }

})


app.put('/vendor/:id', async (req, res)=>{
  // console.log(req.params)
  const data = await User.findByIdAndUpdate(req.params.id, {isVendor: true}, {new: true})
  if(data){
    res.send(data)
  }
})

app.post('/storename', (req, res)=>{
  // console.log(req.body)
  let storenameInfo = {
    storename: req.body.storename,
    owner: req.body.owner,
    ownername: req.body.ownername
  }
  const storename = new Storename(storenameInfo)
  storename.save()
  res.send(storename)

})
app.get('/storename/:id', async (req, res)=>{
    const data = await Storename.find({owner: req.params.id})
    res.send(data)
})

app.post('/categoryname', (req, res)=>{
  let categorynameInfo = {
    label: req.body.categoryname,
    value: req.body.value,
  }
  const category = new Categoryname(categorynameInfo)
  category.save()
  res.send(category)
})
app.get('/categoryname', async function (req, res) {
  let data = await Categoryname.find({})
  res.send(data)
})

app.post('/productposition', (req, res)=>{
  let productpositionInfo = {
    label: req.body.name,
    value: req.body.value,
  }
  const position = new Productposition(productpositionInfo)
  position.save()
  res.send(position)
})

app.post('/product', (req, res)=>{
  // console.log(req.body)
  let productInfo = {
    name: req.body.name,
    brand: req.body.brand,
    category: req.body.category,
    price: req.body.price,
    color: req.body.color,
    size: req.body.size,
    description: req.body.description,
    image: req.body.image,
  }
  const product = new Product(productInfo)
  product.save()
  res.send(product)
})
app.get('/product', async function (req, res) {
  let data = await Product.find({})
  res.send(data)
})
app.get('/productDetails/:id', async function (req, res) {
  // console.log(req.params)
  let data = await Product.findById(req.params.id)
  res.send(data)
})


app.listen(8000, ()=>{
    console.log("server running 8000")
})