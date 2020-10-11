const express = require('express');
const app = express();
let sql = require("mssql");
const sqlserver = require('./config/sqlserver.json')

//Setting up server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initialising connection string
var dbConfig = {
    user: sqlserver.user,
    password: sqlserver.password,
    server: sqlserver.server, 
    database: sqlserver.database
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

module.exports.executeStoreProcedure = function(req, res, paramsInput, paramsOutput){             
  sql.connect(dbConfig, function (err) {
      if (err) {   
          console.log("Error while connecting database :- " + err);
          res.send(err);
      }
      else {
        // create Request object
        var request = new sql.Request();
        // Add parameters
        paramsInput.forEach(function(p) {
          request.input(p.name, p.sqltype, p.value);
        });

        paramsOutput.forEach(function(p) {
          request.input(p.name, p.sqltype, p.value);
        });

        // query to the database
        request.execute(req, function (err, response) {
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