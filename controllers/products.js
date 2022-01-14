//Dependencies
const express = require('express')
const productsRouter = express.Router()
const Product = require('../models/product')
//vv Allows .env access
require('dotenv').config()
//vv Admin secret password for edit/add access
const { ADMINSECRET } = process.env

// //Seed Route - Delete Later
// const productSeed = require('../models/productSeed')
// productsRouter.get('/products/seed', (req, res) => {
//     //removes any data already there in case you accidentally hit seed twice
//     Product.deleteMany({}, (error, allProducts) => {})
//     //creates the seed, pulling from /models/bookSeed.js
//     Product.create(productSeed, (error, data) => {
//         //Redirect to index to display freshly made seed books
//             res.redirect('/product_category');
//         }
//     );
// });

//##########################
    //INDEX ROUTES
//##########################

//Index route
productsRouter.get('/', (req, res) => {
    Product.find({}, (error, allProducts) => {
    //^^Finds ALL products created by models/product.js
        res.render('home.ejs', {
        //^^Renders all products, there are no nav links to this page
        //vvBrings in all products to be displayed, no filters or category separation
            products: allProducts
        })
    })
})

//Index GUITAR Route
productsRouter.get('/guitar', (req, res) => {
    Product.find({"category": "guitar"}, (error, allProducts) => {
    //^^Finds only the category: guitar from the product models, passed down as allProducts
        res.render('home.ejs', {
        //^^Renders all product page, but only with retrieved products category: guitar
        //vv Brings in allProducts, which above was limited to category: guitar
            products: allProducts
        })
    })
})

//Index BASS route
productsRouter.get('/bass', (req, res) => {
    Product.find({"category": "bass"}, (error, allProducts) => {
    //^^Finds only the category: bass from the product models, passed down as allProducts
        res.render('home.ejs', {
        //^^Renders all product page, but only with retrieved products category: bass
        //vv Brings in allProducts, which above was limited to category: bass
            products: allProducts
        })
    })
})

//Index EFFECTS Route
productsRouter.get('/effects', (req, res) => {
    Product.find({"category": "effects"}, (error, allProducts) => {
    //^^Finds only the category: effects from the product models, passed down as allProducts
        res.render('home.ejs', {
        //^^Renders all product page, but only with retrieved products category: effects
        //vv Brings in allProducts, which above was limited to category: effects
            products: allProducts
        })
    })
})

//Index CONTACT Route
productsRouter.get('/contact', (req, res) => {
    res.render('contact.ejs')
    //^^Renders the Contact Page, doesn't bring in data, all forms are static and constructed in HTML only
})

//##########################
    //NEW ROUTES
//##########################

//New Route
productsRouter.get(`/${ADMINSECRET}/new`, (req, res) => {
    //^^Brings in ADMINSECRET from .env. This was a solution until I had a good grasp on authorization
    res.render('admin/new.ejs')
    //^^Renders admin page, no data is brought in in this route
})
//##########################
    //DELETE ROUTES
//##########################
//Delete Route
productsRouter.delete('/:id', (req, res) => {
    //^^Delete action is /product_category/ID
    Product.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
        //^^Finds the product by its id. ^^req.params.id is request body's parameters, id
        res.redirect('/product_category')
        //^^Redirected to the all products page, this is not separated by any filters/categories
    })
})

//##########################
    //UPDATE ROUTES
//##########################
//Update Route
productsRouter.put('/:id', (req, res) => {
    //^^Put action == /product_category/ID
    Product.findByIdAndUpdate(
    //^^Finding product by id to Update
        req.params.id,
        //^^First, it finds the product by params.id
        req.body, 
        //^^Next, it is going to modify the req.body
        { new: true },
        //^^It is going to show the new version. This is important to include, 
        //^^or else it will show the old version, confusing
        (error, updatedProduct) => {
        //^^We could display updatedProduct in case we want to give users a last chance to revert back.
        //^^That is not what we are doing in this case, so it is not used here. 
            res.redirect(`/product_category/${req.params.id}`)
            //^^Redirecting to /product_category/ID
    })
})

//##########################
    //CREATE ROUTES
//##########################
//Create Route
productsRouter.post('/', (req, res) => {
    //^^Posting to /product_category which is the all products page, because we're posting to the general product catalog
    Product.create(req.body, (err, newProduct) => {
    //^^Create, not by id, adding to general product catalog, aka the req.body. This uses the product.js model
        res.redirect('/product_category')
        //^^After creation, we go to the overall product page with all products displayed
    })
})

//##########################
    //EDIT ROUTES
//##########################
//Edit Route
productsRouter.get(`/${ADMINSECRET}/:id/edit`, (req, res) => {
    //^^Route is /product_category/ADMINSECRET/ID/edit, this will be changed once I get authorization working for admin acct
    Product.findById(req.params.id, (err, foundProduct) => {
    //^^Finding product by id, this is product.js model == req.body, params.id points to the id, brings it in as foundProduct
        res.render('admin/update.ejs', {
        //^^Renders the update.ejs page to allow the product to be edited. 
            product: foundProduct
            //^^brings in the req.body of that id
        })
    })
})

//##########################
    //SHOW ROUTES
//##########################
//Show Route
productsRouter.get('/:id', (req, res) => {
    //^^Products show route, shows a single product /product_category/ID
    Product.findById(req.params.id, (err, foundProduct) => {
    //^^Specific product is found by ID, checks the req body for params.id, gives access to foundProduct
        res.render('show.ejs', {
        //^^Renders the show page
            product: foundProduct
            //^^Brings in the req.body of the found item    
        })
    })
})

module.exports = productsRouter
//^^exports productsRouter for use in the rest of the program