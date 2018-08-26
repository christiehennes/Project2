var db = require("../server/models");


module.exports = function(app) {
  
  // Load index page
  app.get("/", function(req, res) {
    db.Product.findAll({}).then(function() {
      res.render("index", {
        msg: "Welcome!"
      });
    });
  });
    
  // Load listing page with all products available
  app.get("/list", function(req, res) {
    db.Product.findAll({}).then(function(dbProducts) {
      res.render("list", {
        msg: "Welcome!",
        products: dbProducts
      });
    });
  });

  // List items per category
  app.get("/list/:category", function(req, res) {
    db.Product.findAll({where: { category: [Op.like] `%${req.params.category}%`} }).then(function(dbProducts) {
      res.render("list", {
        msg: "Welcome!",
        products: dbProducts
      });
    });
  });

  // List specific items
  app.get("/list/:name", function(req, res) {
    db.Product.findAll({where: { name: [Op.like] `%${req.params.name}%`} }).then(function(dbProducts) {
      res.render("list", {
        msg: "Welcome!",
        products: dbProducts
      });
    });
  });

 
  
  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

};
