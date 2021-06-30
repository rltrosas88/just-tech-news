const router = require('express').Router();

const userRoutes = require('./user-routes.js');
//3.6 step SEVEN add the postRoutes
const postRoutes = require('./post-routes');
//5.4 step TWO import the comment-routes.js
const commentRoutes = require('./comment-routes');

router.use('/comments', commentRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;