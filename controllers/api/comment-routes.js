//5.4 step ONE define the comments own endpoints
const router = require('express').Router();
const { Comments } = require('../../models');
// 14.5.5 step TWO import the withAuth module
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    //5.4 step FOUR
    Comments.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//14.5.5 step FOUR protect (authguard) routes
router.post('/', withAuth, (req, res) => {
    //5.4 step THREE 
    // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
    //14.3.5 step THREE update the .post('/')
    if (req.session) {
        Comments.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            // use the id from the session
            user_id: req.session.user_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

//14.5.5 step FOUR proget (authguard) routes
router.delete('/:id', withAuth, (req, res) => {
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