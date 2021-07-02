//14.1.4 step FIVE
    //create the home-routes.js in the controllers folder
    //This file will contain all of the user-facing routes, such as the homepage and login page
//14.1.4 step SEVEN sets up the main homepage route
const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage');
});

module.exports = router;