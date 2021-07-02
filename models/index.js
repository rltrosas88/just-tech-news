//3.4 step FIVE require the Post model
const Post = require('./Post');
//1.5 Step THREE 
//collect and export the User model data
const User = require('./User');
//4.3 step THREE importing the Vote model
const Vote = require('./Vote');
const Comments = require('./Comments');

//3.5 step ONE create associations that a user can belong to many Posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//3.5 step TWO the constraint is that a post can belong to one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//4.3 step FOUR associate User and Post to one another
    //when we query Post we see a total of how many votes a user creates
    //wehn we query User we see all of the posts they've voted on
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});
      
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

//4.3 step FIVE conect User to Vote directly
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});
  
User.hasMany(Vote, {
    foreignKey: 'user_id'
});
  
Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

//5.3 step FOUR add the model associations
Comments.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Comments.belongsTo(Post, {
    foreignKey: 'post_id'
});
  
User.hasMany(Comments, {
    foreignKey: 'user_id'
});
  
Post.hasMany(Comments, {
    foreignKey: 'post_id'
});

//4.3 step SIX export Vote along with User and Post
//5.3 step THREE export Comment model along with User, Post, and Vote
module.exports = { User, Post, Vote, Comments };