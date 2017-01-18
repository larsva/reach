"use strict";
const fs = require('fs');
const Utils = require('../utils');
const ObjectID = require('mongodb').ObjectID;
const path = require("path");

const addSectorRefs = (req, place, sectorInfo) => {
  let sectorRefs = sectorInfo.map((info) => {
    return {
      name: info.sector.name,
      problems: info.boulders.count,
      id: info.sector._id,
      geoLocation: info.sector.geoLocation
    };
  });
  place['sectors'] = sectorRefs;
  let problems = sectorRefs.reduce((prev, sector) => prev + sector.problems, 0);
  place['problems'] = problems;
  return place;
};

const normalize = (str) => {
  return str.toLowerCase()
    .replace('å','a')
    .replace('ä','a')
    .replace('ö','o');
};

const findImages = (area, place)=> {
  let images = [];
  fs.readdir(__dirname + '/../../static/images/' + normalize(area.name) + '/' + normalize(place.name), (err, files) => {
    if (err) {
      console.log(JSON.stringify(err));
    } else {
      files.forEach(file => {
         images.push(normalize(area.name) + '/' + normalize(place.name) + '/' + file);
      });
    }
  })
  return images;
};

exports.getPlace = (req, res) => {
  const db = req.db;
  let place;
  db.collection('place').findOne({_id: req.params.id})
    .then((p) => {
      place = p;
      return db.collection('area').findOne({"_id": place.area})
        .then((area) => {
           let images = findImages(area, place);
          place['images'] = images;
          return new Promise((resolve, reject) => {
            resolve(place);
          })
        })
    })
    .then((place) => {
      console.log('Place: ' + JSON.stringify(place));
      if (place) {
        return db.collection('sector').find({place: place._id});
      } else {
        Utils.handleError(res, {message: "Unable to find place with id '" + req.params.id + "'"}, "Failed to get place")
      }
    })
    .then((sectors) => {
      if (sectors) {
        return Promise.all(sectors.map((sector) => {
          return db.collection('boulder').count({sector: sector._id})
            .then((count) => {
              return {sector: sector, boulders: {count: count}};
            })
        }));
      } else {
        console.log('No sectors found for place : ' + place._id);
        place['sectors'] = [];
        res.status(200).json(place);
      }
    })
    .then((sectorInfo) => {
      res.status(200).json(addSectorRefs(req, place, sectorInfo));
    })
   // .catch((err) => Utils.handleError(res, err, "Failed to get place"));
}