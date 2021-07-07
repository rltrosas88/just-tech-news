// 14.5.5 step TWO import the withAuth module
const withAuth = require('../utils/auth');
// 14.5.3 step TWO
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// 14.5.3 step FOUR add a GET route
// 14.5.5 step THREE insert the withAuth() function into the GET route
router.get('/', withAuth, (req, res) => {
    // 14.5.4 step ONE update so
        //the dashboard will only display posts create by the logged in user
            //add a where object to the findAll()query that uses the id saved on the session
        //serialize the Sequelize data before sending it to the template
    Post.findAll({
        where: {
            // use the ID from the session
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
            // serialize data before passing to template
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;