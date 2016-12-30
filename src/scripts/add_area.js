"use strict";
const mongodb = require('mongodb-bluebird'),
   config = require('../server/configuration'),
  jsonfile = require('jsonfile');

const url = config.MONGODB_URI;

const addOrUpdate = (areas,area, id) => {
  if (id) {
    console.log("Updated area'" + area.name +"'.");
    return areas.update({_id: id}, area);
  } else {
    console.log("Inserted area'" + area.name +"'.");
    return areas.insert(area);
  }

};

const processAreaFile = function (db, file, callback) {
  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      console.log("ERROR: " + err);
      callback(err);
    } else {
      const area = obj;
      const areas = db.collection('area');
      console.log('================================================');
      console.log('Updating/adding area ' + area.name);
      console.log('================================================');
      areas.findOne({name: area.name})
        .then((existingArea) => addOrUpdate(areas,area, existingArea ? existingArea['_id'] : null))
        .then((area) => callback(area))
        .catch((err) => {
          console.log("ERROR: " + err);
          callback(err);
        });
    }
  })
}

const add_area = function (file) {
  console.log('URL: ' + url);
  mongodb.connect(url, file)
    .then((db) => {
      processAreaFile(db, file, (result) => db.close());
    })
    .catch((err) =>  console.log("ERROR: " + err));
}

let file = process.argv[2];
add_area(file);