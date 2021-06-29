//4.3 step ONE create  a through table
    // this is when a third table is created for connecting the data between two other tables with their primary keys
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
    
class Vote extends Model {}
    
Vote.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // 4.3 step TWO add user_id field that holds the primary key value of a user
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
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'vote'
    }
);
    
module.exports = Vote;