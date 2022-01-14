//Dependency
const mongoose = require('mongoose')

const Schema = mongoose.Schema
//^^assigning mongoose.Schema to simplify code

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
        //^^Normal stuff, just descriptors of the products being made
        createdBy: {
        //^^createdBy will allow us to search for the user who created a cart item
            type: Schema.Types.ObjectId,
            //^^ A special 'type', this assigns the objectId to the createdBy document
            ref: 'User'
            //^^ References a user
        }
    }
)

module.exports = mongoose.model('Cart', cartSchema)
//^^This exports the mongoose mode, the cartSchema