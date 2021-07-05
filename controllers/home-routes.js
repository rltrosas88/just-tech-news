//14.1.4 step FIVE
    //create the home-routes.js in the controllers folder
    //This file will contain all of the user-facing routes, such as the homepage and login page
//14.1.4 step SEVEN sets up the main homepage route
const router = require('express').Router();
//14.1.6 step ONE import the necessary modules and models 
const sequelize = require('../config/connection');
const { Post, User, Comments } = require('../models');

router.get('/', (req, res) => {
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
            console.log(dbPostData[0]);
            //14.1.6 step FIVE the entire array of posts will be in the template the array needs to serialized
            const posts = dbPostData.map(post => post.get({ plain: true }));
            // pass a single post object into the homepage template
            //14.1.6 step FOUR use the get() method to serialize the object down to only the properties you need
            // res.render('homepage', dbPostData[0].get({ plain: true }));
            //14.1.6 step SIX up date render () and add the array to an object and continue passing an object to the template
            res.render('homepage', { posts });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
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