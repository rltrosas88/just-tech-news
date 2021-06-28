//1.4 step two
// import the Sequelize constructor from the library
const Sequelize = require('sequelize');

//1.4 step four (step three was adding the .env file)
    //change the 'just_tech_news_db', 'username', and 'password' to process.env.DB_NAME, process.env.DB_USER, and process.env.DB_PW
require('dotenv').config();

// create connection to our database, pass in your MySQL information for username and password
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;