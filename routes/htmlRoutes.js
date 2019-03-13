// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.post("/search", function(req, res) {
    var breweriesArray = [];
    var certified = req.body.certified;
    console.log("value" + certified);
    var testZip = req.body.place_event;
    var testRadius = req.body.radius;
    var zipObject = zipcodes.lookup(testZip);
    if (zipObject !== undefined) {
      var latitude = zipObject.latitude;
      var longitude = zipObject.longitude;
    }
    breweryzip.getBreweriesZip(
      testZip,
      testRadius,
      breweriesArray,
      certified,
      function(data, err) {
        if (!err) {
          //console.log("resultado "+JSON.stringify(data));
          res.render("explore-sidebar-map", {
            zip_code: testZip,
            data: data,
            lat: latitude,
            lng: longitude,
            result: JSON.stringify(data)
          });
        } else {
          res.render("index");
        }
      }
    );
  });

  app.post("/detail", function(req, res) {
    var name_brewery = req.body.name_brewery;
    var address_brewery = req.body.address_brewery;
    var overview_brewery = req.body.overview_brewery;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var phone = req.body.phone;
    var website = req.body.website;

// Dependencies
// =============================================================
var path = require('path')

// Requiring our custom middleware for checking if a user is logged in
// var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function (app) {
  // Each of the below routes just handles the HTML page that the user gets sent to
  // loads homepage
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })

  // loads about page
  app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/about.html'))
  })

  // loads contact page
  app.get('/contact', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/about.html'))
  })

  // loads search page
  app.get('/user/:user.id', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/search.html'))
  })

  // loads 404 on any unconnect Url
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/404.html'))
  })

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page

    res.render("listing-detail-sidebar", {
      name_brewery: name_brewery,
      address_brewery: address_brewery,
      overview_brewery: overview_brewery,
      latitude: latitude,
      longitude: longitude,
      phone: phone,
      website: website
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

  // app.get("/blog", isAuthenticated, function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/blog.html"));
  // });
}

