//5.3 step ONE hold the
    //text of the comment
    //id of the user
    //id of the post
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
    
class Comments extends Model {}
    
Comments.init(
    {
        // 5.3 step TWO columns will go here
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment_text: {
            type: DataTypes.STRING, 
            allowNull:false,
            validate: {
                len: [1]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);
    
    module.exports = Comments;