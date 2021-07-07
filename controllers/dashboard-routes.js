// 14.5.3 step TWO
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// 14.5.3 step FOUR add a GET route
router.get('/', (req, res) => {
    res.render('dashboard', { loggedIn: true });
});

module.exports = router;