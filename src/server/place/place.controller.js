"use strict";

const ObjectID = require('mongodb').ObjectID;
const config = require('../configuration');
const Utils = require('../utils');


const addSectorRefs = (req, place, sectors) => {
  let sectorRefs = sectors.map((sector) => {
    return {name: sector.name, url: Utils.buildUrl(req,'/reach/sector/id/' + sector._id)};
  });
  place['sectors'] = sectorRefs;
  return place;
};

exports.getPlace = (req,res) => {
  const db = req.db;
  db.collection('place').findOne({_id: req.params.id})
    .then((place) => {
      if (place) {
        db.collection('sector').find({place: place._id})
          .then((sectors) => {
            res.status(200).json(addSectorRefs(req, place, sectors));
          })
      } else {
        Utils.handleError(res, "Unable to find place with id '" + req.params.id +"'", "Failed to get place")
      }
    })
    .catch((err) => Utils.handleError(res, err.message, "Failed to get place"));
}