//5.4 step ONE define the comments own endpoints
const router = require('express').Router();
const { Comments } = require('../../models');

router.get('/', (req, res) => {
    //5.4 step FOUR
    Comments.findAll()
        .then(dbCommentsData => res.json(dbCommentsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    //5.4 step THREE 
    Comments.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
        .then(dbCommentsData => res.json(dbCommentsData))
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
        .then(dbCommentsData => {
            if (!dbCommentsData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbCommentsData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;