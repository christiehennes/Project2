
var db = require("../models");


module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/products", function(req, res) {
    var query = {};
   
    db.Product.findAll({
      where: query
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  app.get("/api/products/:category", function(req, res) {
    
    db.Product.findAll({
      where: {
        category: req.params.category
      },
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  // POST route for saving a new post
  app.post("/api/addProduct", function(req, res) {
    db.Product.create(req.body).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/products/:name", function(req, res) {
    db.Product.destroy({
      where: {
        name: req.params.name
      }
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  // PUT route for updating posts
  /*app.put("/api/products", function(req, res) {
    db.Product.update(
      req.body,
      {
        where: {
          name: req.body.name
        }
      }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });*/
};
