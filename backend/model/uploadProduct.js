const mongooes = require('mongoose')
const {Schema} = mongooes

const productSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    brand:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true, 
    },
    price:{
        type: Number,
        required: true, 
    }, 
    color:{
        type: [String],
        required: true, 
    },
    size:{
        type: [String],
        required: true, 
    },
    description:{
        type: String,
        required: true, 
    },
    image:{
        type: String,
        required: true, 
    },
    


})

const Product = mongooes.model('product', productSchema)
module.exports = Product;