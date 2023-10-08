const mongooes = require('mongoose')
const {Schema} = mongooes

const categorynameSchema = new Schema({
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

const Categoryname = mongooes.model('category', categorynameSchema)
module.exports = Categoryname;