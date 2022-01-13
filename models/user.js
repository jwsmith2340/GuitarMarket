const mongoose = require('mongoose')

const Schema = mongoose.Schema


//Embedded relationship
const cartSchema = new Schema(
    {
        brand:   {type: String, required: true},
        model:   {type: String, required: true},
        color:   {type: String, required: true},
        image:   {type: String, required: true},
        price:   {type: Number, required: true},
        category:{type: String, required: true},
        subC1:   {type: String, required: true},
        description: {type: String},
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    //^^Any time we create a new cart entry, it is going use the cartSchema to create it
    }, 
)

const userSchema = new Schema(
    {
        email: {type: String, unique: true, required: true},
        password: {type: String, required: true},
        cart: [cartSchema]
    }
)

module.exports = mongoose.model('User', userSchema)