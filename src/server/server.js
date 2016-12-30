"use strict";
((app) => {
  const express = require("express");
  const bodyParser = require("body-parser");
  const mongodb = require('mongodb-bluebird');
  const config = require('./configuration');

  const apiPrefix = '/reach';

  app.use(express.static(__dirname + "/public"));
  app.use(bodyParser.json());

  console.log('MONGODB_URI' + config.MONGODB_URI);

  mongodb.connect(config.MONGODB_URI)
    .then((database) => {
      console.log("Database connection ready");
      app.use(function (req, res, next) {
        req.db = database;
        next();
      });
      app.use(apiPrefix + '/area', require('./area'));
      app.use(apiPrefix + '/place', require('./place'));
      app.use(apiPrefix + '/sector', require('./sector'));
      app.use(apiPrefix + '/boulder', require('./boulder'));

      app.listen(config.port, () => {
        console.log("App now running on port", config.port);
      });
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);

    })
})
(require('express')());