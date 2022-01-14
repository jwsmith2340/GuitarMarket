//Dependency
const mongoose = require('mongoose')

const Schema = mongoose.Schema
//^^Assigning mongoose.Schema to Schema to simplify code

const productSchema = new Schema(
    //^^Defining productSchema
    {
        brand:   {type: String, required: true},
        model:   {type: String, required: true},
        color:   {type: String, required: true},
        image:   {type: String, required: true},
        price:   {type: Number, required: true},
        category:{type: String, required: true},
        subC1:   {type: String, required: true},
        description: {type: String},
        //^^Including document key values
    }
)

module.exports = mongoose.model('Product', productSchema)
//Exporting the mongoose model productSchema