const mongooes = require('mongoose')
const {Schema} = mongooes

const userSchema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: String,
        isVendor: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        }
    }
)

const User = mongooes.model('user', userSchema)
module.exports = User;