//Declare dependencies
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const expressSession = require('express-session')
const methodOverride = require('method-override')

const productsController = require('./controllers/products')
const usersController = require('./controllers/users')
const cartController = require('./controllers/cart')
//^^Bringing in all of the controllers
const auth = require('./middleware/auth')
//^^Brings in 'auth', the authentication middleware found in /middleware/auth.js

require('dotenv').config()
//^^Allows access to .env file

//Initiate app
const app = express()

//Env link
const { PORT, MONGODB_URI, SECRET } = process.env
//^^Brings in PORT, MONGODB_URI, and SECRET via process.env

//Mongo connection
mongoose.connect(MONGODB_URI)
//^^Connects Mongoose to MONGODB_URI, the MongoDB URI

const db = mongoose.connection
//^^Declaring db as a variable for the mongoose connection

db.on('connected', () => console.log('Connected to Mongo'))
db.on('disconnected', () => console.log('Disconnected from Mongo'))
db.on('error', (err) => console.log('Error: ', err))
//^^DB listeners, provides info in console based on connection status

//Mount Middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
//^^This is the body parser middleware, without it, we could not make post requests
app.use(expressSession({
    secret: SECRET,
    resave: false, 
    saveUninitialized: false
}))
//^^This is how we create a session, a cookie
app.use(express.static('public'))
//^^Links us to static files, CSS here
app.use(methodOverride('_method'))
//^^Allows us to override get and post routes to instead update or delete
app.use(function(req, res, next) {
    console.log('Session Store:', req.session)
    next()
})
// ^^custom middleware that lets us log the session to the console
app.use(auth.handleLoggedInUser)
//^^Allows use of the /middleware/auth.js function handleLoggedInUser across our program
//^^We still have to declare 'auth' as a dependency in any controller we want to use it in

//Controller route
app.use('/product_category', productsController)
app.use('/users', usersController)
//app.use('/cart', cartController)
//^^Commented out at this time, app still in development, may be utilized later
app.get('/', (req, res) => {
    res.render('index.ejs')
})

//Express listener
app.listen(PORT, () => console.log(`Listening on ${PORT}`))