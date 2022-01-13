
// const express = require('express')
// const cartRouter = express.Router()
// const Cart = require('../models/carts')

// //Seed Route - Delete Later
// const cartSeed = require('../models/cartSeed')
// cartRouter.get('/seed', (req, res) => {
//     Cart.deleteMany({}, (error, allCart) => {})
//     Cart.create(cartSeed, (error, data) => {
//         res.redirect('/cart')
//     })
// })

// //index
// // cartRouter.get('/', (req, res) => {
// //     Cart.find({}, (error, allCart) => {
// //         res.render('cart.ejs', {
// //             cart: allCart,
// //         })
// //     })
// // })

// //delete
// cartRouter.delete('/:id', (req, res) => {
//     Cart.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
//         res.redirect('/cart')
//     })
// })

// //create
// cartRouter.post('/', (req, res) => {
//     Cart.create(req.body, (error, newCart) => {
//         res.redirect('/cart')
//     })
// })

// //edit

// //show
// cartRouter.get('/:id', (req, res) => {
//     Cart.findById(req.params.id, (err, foundCart) => {
//         res.render('show.ejs', {
//             cart: foundCart
//         })
//     })
// })

// module.exports = cartRouter





// const express = require('express')
// const cartRouter = express.Router()
// const Cart = require('../models/carts')

// const express = require('express')
// const cartRouter = express.Router()
// const User = require('../models/user')

// cartRouter.get('/cart/:id', (req, res) => {
//     User.
// })



// module.exports = cartRouter