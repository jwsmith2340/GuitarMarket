//Dependencies
const express = require('express')
const usersRouter = express.Router()
const User = require('../models/user') 
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')

//##########################
    //LOGIN ROUTES
//##########################
usersRouter.get('/login', (req, res) => {
    //^^The route is /users/login
    res.render('login.ejs', {error: ''})
    //^^That route renders the login.ejs page
})

usersRouter.post('/login', (req, res) => {//this is where we are checking the username
    /*  1.)     Lookup the user in the database based on email
            1.1)    If the email doesn't exist, let the user know they entered 
                    invalid credentials.
            1.2)    If the user exists, begin password compare process
        2.)     Check to see if plain text password matches encrypted password
            2.1)    If there is no match, we need to let the user know they 
                    entered invalid credentials
            2.2)    If there IS a match, move on to session creation
        3.)     Create a user session using req.session
        4.)     Redirect the user to a landing page
    */
   User.findOne({email: req.body.email}, (err, user) => {
       if (!user) return res.render('login.ejs', {error: 'Invalid credentials'})
       //We use this return statement to immediately exit, since we don't want 
       //the code to keep moving forward here, we want to exit with the error statement

       const isMatched = bcrypt.compareSync(req.body.password, user.password) 
       if (!isMatched) return res.render('login.ejs', {error: 'Invalid credentials'})
       //perform password validation

       req.session.user = user._id
       //we store the user information this way because it is the minimal
       //amount we need, it protects the users. This creates the session, this
       //is what logs the user in. 
       res.redirect('/')
       //We send our user home, or wherever we want after the session is made
   })
})

//##########################
    //REGISTER ROUTES
//##########################
usersRouter.get('/register', (req, res) => {
    //^^route is /users/register page
    res.render('register.ejs')
    //^^renders the register.ejs page
})

//Password Encryption
usersRouter.post('/register', (req, res) => {
    // 1) encrypt their plain text password with Bcrypt
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12))//hashSync just runs a synchronous version of bcrypt
    // 1.1) Now we create a user
    User.create(req.body, (err, user) => {
    // 2) redirect to login
        res.redirect('/users/login')
    })
})

//##########################
    //LOGOUT ROUTES
//##########################
usersRouter.get('/logout', (req, res) => {
    //^^Gets /users/logout
    req.session.destroy(function() {
    //^^Calls the session cookie and destroys it, effectively logging out
    res.redirect('/users/login')
    //^^Then redirects the user to the login page
    })
})

//##########################
    //CART ROUTES
//##########################
//Index Route
usersRouter.get('/cart', auth.isAuthenticated, (req, res) => {
    //^^Gets the shopping cart but requires the user is authenticated
    res.render('cart.ejs')
    //^^Renders teh cart.ejs page
})

//New Route
//^^Nothing here

//Delete Route
usersRouter.delete('/:id/cart', auth.isAuthenticated, (req, res) => {
    //^^Using usersRouter to delete the same path as our post route /users/ID/cart, requires authentication
    User.findById(req.user._id, (err, user) => {
    //^^Finds the user by id, but does not findByIdAndDelete, this would delete our user at this point
    //^^Instead, we find the user by id using req.user._id, the Mongo ID and assign it to user
        user.cart.pull(req.params.id)
        //^^We now access the user's cart via it's embedded relationship in the /models/user.js file.
        //^^The cart is stored as objects in an array within the user schema, this is how we pull the 
        //^^req.body.id, the individual item we are trying to delete. Once it is pulled, the delete route
        //^^deletes it
        user.save((err) => {
        //^^We now save the user in it's current state. This will save the current version of the cart array
            res.redirect('/users/cart')
            //^^The user is now redirected to their shopping cart. 
        })
    })
})

//Update Route
//^^Nothing Here

//Create Route
usersRouter.post('/:id/cart', auth.isAuthenticated, (req, res) => {
    //^^We are posting to /users/ID/cart via the add to cart button on the show page
    //^^This requires that the user be authenticated
    User.findById(req.params.id, (err, user) => {
    //^^We are finding the user by their req.body param of id and passing it down as user
        user.cart.push(req.body)
        //^^The user's cart, an array, is now pushing the req.body of whatever we're posting
        //^^In this case, we are pushing an item into the cart, which has an embedded relationship
        //^^with the user schema. This effectively attaches that product to the user.
        user.save(function(err) {
        //^^This saves the user in its current state, with the newly added products in the cart array
            res.redirect('/users/cart')
            //^^This now redirects to users/cart which renders the cart.ejs page
        })
    })
})

module.exports = usersRouter
//^^Exports the usersRouter