require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require('cookie-parser');
var exphbs = require("express-handlebars");

var db = require("./models/index");

// directory references
const clientDir = path.join(__dirname, '../client');

// Express
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(`${clientDir}/public`));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("../routes/apiRoutes")(app);
require("../routes/htmlRoutes")(app);
require("../routes/post-api-routes")(app);

var syncOptions = { force: true }; //TODO change this to false later

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
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
