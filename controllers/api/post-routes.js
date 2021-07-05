//3.6 step ONE  include packages and models that is needed in order to create the Express.js API end points
const router = require('express').Router();
//4.4 step THREE import the connection to the database 
const sequelize = require('../../config/connection');
//5.5 step TWO add comment to the destructured objects 
const { Post, User, Comments, Vote } = require('../../models');


// 3.6 step TWO create a route that will get all users
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
        //3.6 step THREE Query configuration
        //4.5 step ONE update the `.findAll()` method's attributes [sequelize.literal] to include the total vote count for a post
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        //5.5 step ONE
        //order: [['created_at', 'DESC']],
        //3.6 step TWELVE to ensure that the latest news articles are show first to the client
        //order: [['created_at', 'DESC']],
        //3.6 step FOUR include the JOIN to the User table
        include: [
            //5.5 step ONE include the Comment model here:
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
    //3.6 step FIVE create a Promise that captures the response from the database call
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//3.6 step step EIGHT get-one-query that will use a request parameter
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            //4.5 step TWO
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
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//3.6 step NINE assign the values of the title, post_url, and user_id to the properties in the req.body object
router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// 4.4 step ONE PUT /api/posts/upvote
router.put('/upvote', (req, res) => {
    // Vote.create({
    //     user_id: req.body.user_id,
    //     post_id: req.body.post_id
    // //4.4 step FOUR update the PUT route's function
    // }).then(() => {
    //     // then find the post we just voted on
    //     return Post.findOne({
    //         where: {
    //             id: req.body.post_id
    //         },
    //         attributes: [
    //             'id',
    //             'post_url',
    //             'title',
    //             'created_at',
    //             // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name `vote_count`
    //             [
    //                 sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
    //                 'vote_count'
    //             ]
    //         ]
    //     })
    //     .then(dbPostData => res.json(dbPostData))
    //4.6 step FOUR custom static method created in models/Post.js
    Post.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comments, User })
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//3.6 step TEN update the Post's Title
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//3.6 step ELEVEN delete an entry
router.delete('/:id', (req, res) => {
    console.log('id', req.params.id);
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//3.6 step SIX expose the changes to the router
module.exports = router;