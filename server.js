var express = require('express');
var app = express();
var sql = require("mssql");

//Setting up server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initialising connection string
var dbConfig = {
    user: 'sa',
    password: '123',
    server: 'localhost', 
    database: 'RoomManagement' 
};

module.exports.executeQuery = function(req, res, parameters){             
    sql.connect(dbConfig, function (err) {
        if (err) {   
            console.log("Error while connecting database :- " + err);
            res.send(err);
        }
        else {
          // create Request object
          var request = new sql.Request();
          // Add parameters
          parameters.forEach(function(p) {
            request.input(p.name, p.sqltype, p.value);
          });

          // query to the database
          request.query(req, function (err, response) {
            if (err) {
              console.log("Error while querying database :- " + err);
              res.send(err);
              }
              else {
                console.log(response);
                res.send(response);
              }
          });
        }
    });           
}