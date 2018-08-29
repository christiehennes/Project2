var path = require("path");

module.exports = function(app) {
  
  // Load home page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/public/html/index.html"));
  });

  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/public/html/login.html"));
  });

  app.get("/register", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/public/html/register.html"));
  });
    
  // Load listing page with all products available. Users will be able to search on this page
  // Results will be populated on this page via the API routes
  app.get("/listProducts", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/public/html/listProducts.html"));
  });

  // Load the form to submit a new product 
  app.get("/postProduct", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/public/html/postProduct.html"));
  });

  // Load the form to checkout after you selected an item to buy 
  app.get("/checkout", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/public/html/checkout.html"));
  });
 
};
