const mongooes = require('mongoose')
const {Schema} = mongooes

const productPositionSchema = new Schema({
    label:{
        type: String,
        required: true,
        unique: true
    },
    value:{
        type: String,
        required: true,
        unique: true
    }
})

const Productposition = mongooes.model('productposition', productPositionSchema)
module.exports = Productposition;