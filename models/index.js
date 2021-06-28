//1.5 Step Three
//collect and export the User model data
const User = require('./User');
//3.4 step FIVE require the Post model
const Post = require("./Post");

//3.5 step ONE create associations that a user can belong to many Posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//3.5 step TWO the constraint is that a post can belong to one user
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Post };