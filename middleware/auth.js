const user = require('../models/user')

//this is all just middleware
function isAuthenticated(req, res, next) {
    if (!req.user) return res.redirect('/users/login')
    else return next()
}
//^^This is essentially the same logic from server.js that we have commented out

function handleLoggedInUser(req, res, next) {
    if (!req.session.user) {
        res.locals.user = null
        //^^This defines user for our nav logic
        return next()
    }
    //^^If no user logged in, move on
    user.findById(req.session.user, (err, user) => {
        req.user = user
        //^^This is available in ALL of our controllers, we won't need anymore db lookups
        //That means, we can access 'user' anywhere. 'if(user)...' will now work, we don't need t obring it in
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