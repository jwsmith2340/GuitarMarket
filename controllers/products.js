const express = require('express')
const productsRouter = express.Router()
const Product = require('../models/product')

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
productsRouter.get('/admin/new', (req, res) => {
    res.render('admin/new.ejs')
})

//delete
//update
//create
productsRouter.post('/', (req, res) => {
    Product.create(req.body, (err, newProduct) => {
        res.redirect('/')
    })
})
//edit
//show
productsRouter.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct
        })
    })
})

module.exports = productsRouter