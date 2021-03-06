//14.1.4 step FIVE
    //create the home-routes.js in the controllers folder
    //This file will contain all of the user-facing routes, such as the homepage and login page
//14.1.4 step SEVEN sets up the main homepage route
const router = require('express').Router();
//14.1.6 step ONE import the necessary modules and models 
const sequelize = require('../config/connection');
const { Post, User, Comments, Vote } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
    //14.2.5 part FOUR
    //console.log(req.session);
    console.log('======================');
    //14.1.6 step TWO update the route
    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comments,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
        //14.1.6 step THREE add console.log
            //console.log(dbPostData[0]);
            //14.1.6 step FIVE the entire array of posts will be in the template the array needs to serialized
            const posts = dbPostData.map(post => post.get({ plain: true }));
            // pass a single post object into the homepage template
            //14.1.6 step FOUR use the get() method to serialize the object down to only the properties you need
            // res.render('homepage', dbPostData[0].get({ plain: true }));
            //14.1.6 step SIX up date render () and add the array to an object and continue passing an object to the template
            // 14.3.7 update the homepage route to render the loggedIn
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//14.3.3 step TWO
router.get('/post/:id', (req, res) => {
    //14.3.3 step THREE replace the hardcoded data with a Post.findOne() query
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comments,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
    
            // serialize the data
            const post = dbPostData.get({ plain: true });
    
            // pass data to template
            //14.3.6 step ONE update the route to pass a session variable to the template
            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//     const post = {
//         id: 1,
//         post_url: 'https://handlebarsjs.com/guide/',
//         title: 'Handlebars Docs',
//         created_at: new Date(),
//         vote_count: 10,
//         comments: [{}, {}],
//         user: {
//             username: 'test_user'
//         }
//     };
  
//     res.render('single-post', { post });
// });

// 14.2.3 step FOUR add a route that renders login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
  
    res.render('login');
});

//   res.render('homepage', {
//     //14.1.5 step ONE include all of the data you want to pass to your template using res.render() method
//     id: 1,
//     post_url: 'https://handlebarsjs.com/guide/',
//     title: 'Handlebars Docs',
//     created_at: new Date(),
//     vote_count: 10,
//     comments: [{}, {}],
//     user: {
//         username: 'test_user'
//     }
//   });
// });

module.exports = router;