const express = require('express')
const cartRouter = express.Router()
const Cart = require('../models/product')

//index
cartRouter.get('/', (req, res) => {
    Cart.find({}, (error, allCart) => {
        res.render('cart.ejs', {
            cart: allCart,
        })
    })
})

//new

//delete

//update

//create
cartRouter.post('/', (req, res) => {
    Cart.create(req.body, (err, newProduct) => {
        res.redirect('/cart')
    })
})

//edit

//show
cartRouter.get('/:id', (req, res) => {
    Cart.findById(req.params.id, (err, foundCart) => {
        res.render('show.ejs', {
            cart: foundCart
        })
    })
})

module.exports = cartRouter