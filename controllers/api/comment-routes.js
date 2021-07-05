//5.4 step ONE define the comments own endpoints
const router = require('express').Router();
const { Comments } = require('../../models');

router.get('/', (req, res) => {
    //5.4 step FOUR
    Comments.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    //5.4 step THREE 
    // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
    Comments.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.delete('/:id', (req, res) => {
    //5.4 step FIVE
    Comments.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id!' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;