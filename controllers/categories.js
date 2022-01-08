const express = require('express')
const categoriesRouter = express.Router()
const Category = require('../models/product')

//index
categoriesRouter.get('/', (req, res) => {
    category.find({}, (error, allcategorys) => {
        res.render('index.ejs', {
            categorys: allcategorys
        })
    })
})

//new

//delete

//update

//create

//edit

//show
categoriesRouter.get('/:id', (req, res) => {
    category.findById(req.params.id, (err, foundcategory) => {
        res.render('show.ejs', {
            category: foundcategory
        })
    })
})

module.exports = categoriesRouter