//Declare dependencies
const express = require('express')
const mongoose = require('mongoose')
const productsController = require('./controllers/products')
const usersController = require('./controllers/users')
const cartController = require('./controllers/cart')
const morgan = require('morgan')
const expressSession = require('express-session')
const methodOverride = require('method-override')
const auth = require('./middleware/auth')

require('dotenv').config()

//Initiate app
const app = express()

//Env link
const { PORT, MONGODB_URI, SECRET } = process.env

//Mongo connection
mongoose.connect(MONGODB_URI)

const db = mongoose.connection

db.on('connected', () => console.log('Connected to Mongo'))
db.on('disconnected', () => console.log('Disconnected from Mongo'))
db.on('error', (err) => console.log('Error: ', err))

//mount middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(expressSession({
    secret: SECRET,
    resave: false, 
    saveUninitialized: false
}))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(function(req, res, next) {
    console.log('Session Store:', req.session)
    next()
})
// ^^custom middleware that lets us log the session to the console
app.use(auth.handleLoggedInUser)

//Controller route
app.use('/product_category', productsController)
app.use('/users', usersController)
//app.use('/cart', cartController)
app.get('/', (req, res) => {
    res.render('index.ejs')
})

//Express listener
app.listen(PORT, () => console.log(`Listening on ${PORT}`))