const express = require('express')
const productsRouter = express.Router()
const Product = require('../models/product')

require('dotenv').config()

const { ADMINSECRET } = process.env

//Seed Route - Delete Later
const productSeed = require('../models/productSeed')
productsRouter.get('/products/seed', (req, res) => {
    //removes any data already there in case you accidentally hit seed twice
    Product.deleteMany({}, (error, allProducts) => {})
    //creates the seed, pulling from /models/bookSeed.js
    Product.create(productSeed, (error, data) => {
        //Redirect to index to display freshly made seed books
            res.redirect('/');
        }
    );
});

//index
productsRouter.get('/', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('home.ejs', {
            products: allProducts
        })
    })
})

//new
productsRouter.get(`/${ADMINSECRET}/new`, (req, res) => {
    res.render('admin/new.ejs')
})

//delete
productsRouter.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
        res.redirect('/')
    })
})

//update
productsRouter.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id,
        req.body, 
        { new: true },
        (error, updatedProduct) => {
            res.redirect(`/${req.params.id}`)
        }
        )
})

//create
productsRouter.post('/', (req, res) => {
    Product.create(req.body, (err, newProduct) => {
        res.redirect('/')
    })
})

//edit
productsRouter.get(`/${ADMINSECRET}/:id/edit`, (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('admin/update.ejs', {
            product: foundProduct
        })
    })
})

//show
productsRouter.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct
        })
    })
})

module.exports = productsRouter