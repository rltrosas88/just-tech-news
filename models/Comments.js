//5.3 step ONE hold the
    //text of the comment
    //id of the user
    //id of the post
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
    
class Comment extends Model {}
    
Comment.init(
    {
        // 5.3 step TWO columns will go here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        },
        comment_text: {
            type: String, 
            allowNull:false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);
    
    module.exports = Comment;