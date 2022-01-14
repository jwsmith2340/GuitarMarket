//Dependencies
const user = require('../models/user')

//Special Authentication Middleware

//Authentication Function
function isAuthenticated(req, res, next) {
    if (!req.user) return res.redirect('/users/login')
    //^^If there is no req.user, return to the login page
    else return next()
    //^^If there is a user, however, we move on to the next piece of middleware
}

//Logged In User Function
function handleLoggedInUser(req, res, next) {
    if (!req.session.user) {
    //^^If there is no session
        res.locals.user = null
        //^^This defines user for our nav logic
        return next()
        //^^If no user logged in, move on
    }

    user.findById(req.session.user, (err, user) => {
        //^^If there IS a user, we are going to pass them, the req.session.user as user
        req.user = user
        //^^This is available in ALL of our controllers, we won't need anymore db lookups
        //^^That means, we can access 'user' anywhere. 'if(user)...' will now work, we don't need to bring it in explicitly
        delete req.user.password
        //^^hiding the user password from the server
        res.locals.user = req.user
        //^^This can only be used in the templates
        next()
        //^^Allows us to pass the request and response along to the next piece of middleware
    })
}

module.exports = {
    isAuthenticated,
    handleLoggedInUser
}
//^^A special way to export more than one thing