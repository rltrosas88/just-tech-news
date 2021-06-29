const router = require('express').Router();

const userRoutes = require('./user-routes');
//3.6 step SEVEN add the postRoutes
const postRoutes = require('./post-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;