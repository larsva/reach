"use strict";
const mongodb = require('mongodb-bluebird'),
  config = require('../server/configuration'),
  jsonfile = require('jsonfile');

const url = config.MONGODB_URI;

const addOrUpdate = (places,place, place_id, area_id) => {
  place['area'] = area_id;
  if (place_id) {
    console.log(place.name + ' updated.');
    return places.update({_id: place_id}, place);
  } else {
    console.log(place.name + " inserted");
    return places.insert(place);
  }
};

const processPlaceFile = (db, file, callback) => {
  jsonfile.readFile(file, (err, obj) => {
      let area;
      const areaName = obj.area.name;
      const placeName = obj.area.place.name;
    console.log('================================================');
    console.log('Updating/adding place for ' + areaName);
    console.log('================================================');
    db.collection('area').findOne({name: areaName})
        .then((item) => {
           if (item) {
             area = item;
             return db.collection('place').findOne({name: placeName, area: area._id});
           } else {
             console.log("ERROR: No area found with name " + areaName);
             callback(item);
           }
        })
        .then((existingPlace) => {
          return addOrUpdate(db.collection('place'),obj.area.place, existingPlace ? existingPlace._id : null, area._id);
        })
        .then((p) => callback(p))
        .catch((e) => {
          console.log("ERROR: " + err)
          callback(e);
        });
    }
  );
};

const add_place = function (file) {
  mongodb.connect(url, file)
    .then((db) => {
      processPlaceFile(db, file, (result) => {
        db.close();
      });
    })
    .catch((err) =>  console.log("ERROR: " + err));
}
let file = process.argv[2];
add_place(file);

