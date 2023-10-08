const mongooes = require('mongoose')
const {Schema} = mongooes

const storenameSchema = new Schema({
    storename:{
        type: String,
        required: true,
        unique: true
    },
    owner:{
        type: mongooes.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    ownername:{
        type: String,
        required: true, 
    }

})

const Storename = mongooes.model('storename', storenameSchema)
module.exports = Storename;