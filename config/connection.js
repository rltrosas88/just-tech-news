//1.4 step two
// import the Sequelize constructor from the library
const Sequelize = require('sequelize');

//1.4 step four (step three was adding the .env file)
    //change the 'just_tech_news_db', 'username', and 'password' to process.env.DB_NAME, process.env.DB_USER, and process.env.DB_PW
require('dotenv').config();

//5.6 step ONE connect a remote MySQL database bosted by Heroku
    //do this step after
        //heroku create
        //git push heroku main
        //got to heroku dashboard and click on the app
        //click on sources and add on JawsDB MySQL
let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // create connection to our database, pass in your MySQL information for username and password
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}
  
module.exports = sequelize;