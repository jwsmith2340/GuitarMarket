//Dependency
const mongoose = require('mongoose')

const Schema = mongoose.Schema
//^^Assigning mongoose.Schema to a variable to clean up code

//Embedded relationship
const cartSchema = new Schema(
    //^^Declaring the cartSchema
    {
        brand:   {type: String, required: true},
        model:   {type: String, required: true},
        color:   {type: String, required: true},
        image:   {type: String, required: true},
        price:   {type: Number, required: true},
        category:{type: String, required: true},
        subC1:   {type: String, required: true},
        description: {type: String},
        //^^Normal stuff, just descriptors of the products being made
        createdBy: {
        //^^createdBy will allow us to search for the user who created a cart item
            type: Schema.Types.ObjectId,
            //^^ A special 'type', this assigns the objectId to the createdBy document
            ref: 'User'
            //^^ References a user
        }
    }, 
)

const userSchema = new Schema(
    //^^Declaring the userSchema
    //^^The cart schema is actually embedded inside of this userSchema
    {
        email: {type: String, unique: true, required: true},
        password: {type: String, required: true},
        //^^Normal account information
        cart: [cartSchema]
        //^^This is the embedded relationship, the cart is an array that consists of objects that are
        //^^made from the cartSchema
    }, 
    { timestamps: true }
    //^^Shows us when a user was created
)

module.exports = mongoose.model('User', userSchema)
//^^Exports the mongoose model userSchema