"use strict";

const Utils = require('../utils');
const apiPrefix = require('../configuration').apiPrefix;

const addSectorRefs = (req, place, sectorInfo) => {
  let sectorRefs = sectorInfo.map((info) => {
    return {
      name: info.sector.name,
      boulders: info.boulders.count,
      url: Utils.buildUrl(req, apiPrefix + '/sector/id/' + info.sector._id)
    };
  });
  place['sectors'] = sectorRefs;
  return place;
};

exports.getPlace = (req, res) => {
  const db = req.db;
  let place;
  db.collection('place').findOne({_id: req.params.id})
    .then((p) => {
      place = p;
      console.log('Place: ' + JSON.stringify(place));
      if (place) {
        return db.collection('sector').find({place: place._id});
      } else {
        Utils.handleError(res, "Unable to find place with id '" + req.params.id + "'", "Failed to get place")
      }
    })
    .then((sectors) => {
      if (sectors) {
        return Promise.all(sectors.map((sector) => {
          return db.collection('boulder').count({sector: sector._id})
            .then((count) => {
              return {sector: sector, boulders:{ count: count}};
            })
        }));
      } else {
        console.log('No sectors found for place : ' + place._id);
        place['sectors'] = [];
        res.status(200).json(place);
      }
    })
    .then((r) => {
      console.log('Result: ' + JSON.stringify(r));
      res.status(200).json(addSectorRefs(req, place, r));
    })
    .catch((err) => Utils.handleError(res, err.message, "Failed to get place"));
}