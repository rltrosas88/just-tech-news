//14.1.3 step TWO.ONE make the style sheet available to the client
const path = require('path');
//1.6 step 9
const express = require('express');
//14.2.5 step ONE use express-ssion and sequelize store
const session = require('express-session');
//14.1.4 step ONE
    //after typing the following command npm install express-handlebars
    //set up Handlebars.js
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
//14.4.8 step ONE import the helper functions
const helpers = require('./utils/helpers');

//14.4.8 step TWO pass the helpers to the existing exphbs.creat() statement
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 14.1.3 step TWO.TWO make the style sheet available to the client
app.use(express.static(path.join(__dirname, 'public')));

//14.1.4 step FOUR rename the routes folder to controllers
    //update the reference from const routes = require('./routes'); to const routes = require('./controllers/');
//const routes = require('./controllers/');
app.use(require('./controllers/'));


// turn on routes
//app.use(routes);

// turn on connection to db and server
//3.5 step THREE change the value of the force property to true
    // will make the table re-create if there are any association changes
//3.5 step FOUR change the value of the force property back to false
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});