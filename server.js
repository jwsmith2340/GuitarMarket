//Declare dependencies
const express = require('express')
const mongoose = require('mongoose')
const productsController = require('./controllers/products')
const usersController = require('./controllers/users')
const cartController = require('./controllers/cart')
const morgan = require('morgan')
const expressSession = require('express-session')
const methodOverride = require('method-override')

require('dotenv').config()

//Initiate app
const app = express()

//Env link
const { PORT, DATABASE_URI, SECRET } = process.env

//Mongo connection
mongoose.connect(DATABASE_URI)

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
//^^custom middleware that lets us log the session to the console

/*
    vvv Found while trying to fix my Heroku Deployment Issues vvv
*/
// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

// Access the session as req.session
app.get('/', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})
/*
    ^^^ Found while trying to fix my Heroku Deployment Issues ^^^
*/

//Controller route
app.use('/product_category', productsController)
app.use('/users', usersController)
app.use('/cart', cartController)
app.get('/', (req, res) => {
    res.render('index.ejs')
})

//Express listener
app.listen(PORT, () => console.log(`Listening on ${PORT}`))