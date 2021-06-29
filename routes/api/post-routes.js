//3.6 step ONE  include packages and models that is needed in order to create the Express.js API end points
const router = require('express').Router();
const { Post, User } = require('../../models');

// 3.6 step TWO create a route that will get all users
router.get('/', (req, res) => {
    //console.log('======================');
    Post.findAll({
        //3.6 step THREE Query configuration
        attributes: ['id', 'post_url', 'title', 'created_at'],
        //3.6 step TWELVE to ensure that the latest news articles are show first to the client
        order: [['created_at', 'DESC']],
        //3.6 step FOUR include the JOIN to the User table
        include: [
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
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [
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
        user_id: req.body.user_id
    })
        .then(dbPostData => res.json(dbPostData))
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