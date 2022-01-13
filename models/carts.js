const mongoose = require('mongoose')

const Schema = mongoose.Schema

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
    }
)

module.exports = mongoose.model('Cart', cartSchema)