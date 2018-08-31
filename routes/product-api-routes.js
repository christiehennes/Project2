
var db = require("../server/models"); 
var Sequelize = require("sequelize");
const Op = Sequelize.Op;


module.exports = function(app) {

  // SEARCH FUNCTIONS

  // Display all products
  app.get("/api/products", function(req, res) {
    var query = {};
   
    db.Product.findAll({
      where: query
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

    // Display certain category
    app.get("/api/products/category/:category", function(req, res) {
    
      db.Product.findAll({
        where: {
          category: req.params.category
        },
      }).then(function(dbProduct) {
        res.json(dbProduct);
      });
    });

    // Display certain category
    app.get("/api/products/id/:id", function(req, res) {

    db.Product.findAll({
      where: {
        id: req.params.id
      },
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  // Display search for specific parameter
  app.get("/api/products/search/:param", function(req, res) {
    
    db.Product.findAll({ 
      where:  {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${req.params.param}%`
            }
          }]
        
      }
    }).then(function(dbProduct) {
      res.json(dbProduct)
    })
  });



  


  // CREATE AND UPDATE PRODUCT FIELDS

  // POST route for saving a new product
  app.post("/api/addProduct", function(req, res) {
    db.Product.create(req.body).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/deleteProducts/:name", function(req, res) {
    db.Product.destroy({
      where: {
        name: req.params.name
      }
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  // PUT route for updating posts
 /*app.put("/api/products/:name", function(req, res) {
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
