// var db = require("../server/models");
var path = require("path");


module.exports = function(app) {
  
  // Load index page
  app.get("/", function(req, res) {
    // db.Product.findAll({}).then(function() {
    //   res.render("index", {
    //     msg: "Welcome!"
    //   });
    // });

    res.sendFile(path.join(__dirname, "../client/public/html/index.html"));
  });
    
  // Load listing page with all products available
  app.get("/list", function(req, res) {
    // db.Product.findAll({}).then(function(dbProducts) {
    //   res.render("list", {
    //     msg: "Welcome!",
    //     products: dbProducts
    //   });
    // });

    res.sendFile(path.join(__dirname, "../client/public/html/list.html"));
  });

  // List items per category
  app.get("/list/:category", function(req, res) {
    // db.Product.findAll({where: { category: [Op.like] `%${req.params.category}%`} }).then(function(dbProducts) {
    //   res.render("list", {
    //     msg: "Welcome!",
    //     products: dbProducts
    //   });
    // });

  });

  // List specific items by product id 
  app.get("/list/:id", function(req, res) {
    // db.Product.findAll({where: { name: [Op.like] `%${req.params.name}%`} }).then(function(dbProducts) {
    //   res.render("list", {
    //     msg: "Welcome!",
    //     products: dbProducts
    //   });
    // });
  });

 
  app.get("/checkout", function(req, res){
    res.sendFile(path.join(__dirname, "../client/public/html/checkout.html"))
  })

};
