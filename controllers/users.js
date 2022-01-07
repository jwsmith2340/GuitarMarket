const express = require('express')
const usersRouter = express.Router()
const User = require('../models/user') 
const bcrypt = require('bcrypt')

//login routes
usersRouter.get('/login', (req, res) => {
    res.render('login.ejs', {error: ''})
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

//sign up routes
usersRouter.get('/register', (req, res) => {
    res.render('register.ejs')
})

usersRouter.post('/register', (req, res) => {
    // 1) encrypt their plain text password with Bcrypt
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12))//hashSync just runs a synchronous version of bcrypt
    // 1.1) Now we create a user
    User.create(req.body, (err, user) => {
    // 2) redirect to login
        res.redirect('/login')
    })
})

//logout routes
usersRouter.get('/logout', (req, res) => {
    req.session.destroy(function() {
    res.redirect('/users/login')
    })
})

module.exports = usersRouter