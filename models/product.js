const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema(
    {
        brand: {type: String, required: true},
        model: {type: String, required: true},
        color: {type: String, required: true},
        frets: {type: Number, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
    }
)

module.exports = mongoose.model('Product', productSchema)