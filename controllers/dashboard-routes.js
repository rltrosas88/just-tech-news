// 14.5.3 step TWO
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comments, Vote } = require('../models');
// 14.5.5 step TWO import the withAuth module
const withAuth = require('../utils/auth');

// 14.5.3 step FOUR add a GET route
// 14.5.5 step THREE insert the withAuth() function into the GET route
router.get('/', withAuth, (req, res) => {
    // 14.5.4 step ONE update so
        //the dashboard will only display posts create by the logged in user
            //add a where object to the findAll()query that uses the id saved on the session
        //serialize the Sequelize data before sending it to the template
    console.log(req.session);
    console.log('======================');
    Post.findAll({
        where: {
            user_id: req.session.user_id
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
                model: Comment,
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
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// 14.5.6 step FOUR add a GET route for /edit/:id that
    // uses the withAuth() middleware
    //serialize the data
    //renders the edit-post.handlebars template by
        //passing in data from the same Post..findOne() query that was used in the /post/:id
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findByPk(req.params.id, {
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
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
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });
                
                res.render('edit-post', {
                    post,
                    loggedIn: true
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});
    
    module.exports = router;