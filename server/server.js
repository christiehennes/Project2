require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require('cookie-parser');
const customAuthMiddleware = require('./middleware/custom-auth-middleware');

//Controller Import
const userController = require('./controllers/user-controller');

//Connect db
var db = require("./models/index");

// directory references
const clientDir = path.join(__dirname, '../client');

// Express
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(customAuthMiddleware);
app.use(express.static(clientDir + '/public'));


app.use(express.static("public"));


// Routes
require("../routes/htmlRoutes")(app);
require("../routes/product-api-routes")(app);

//Hook up controllers
app.use(userController);

var syncOptions = { force: false }; //TODO change this to false later

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = false;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
