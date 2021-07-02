//14.1.4 step FIVE
    //create the home-routes.js in the controllers folder
    //This file will contain all of the user-facing routes, such as the homepage and login page
//14.1.4 step SEVEN sets up the main homepage route
const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage', {
    //14.1.5 step ONE include all of the data you want to pass to your template using res.render() method
    id: 1,
    post_url: 'https://handlebarsjs.com/guide/',
    title: 'Handlebars Docs',
    created_at: new Date(),
    vote_count: 10,
    comments: [{}, {}],
    user: {
        username: 'test_user'
    }
  });
});

module.exports = router;