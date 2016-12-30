"use strict";

const ObjectID = require('mongodb').ObjectID;
const config = require('../configuration');
const Utils = require('../utils');

const addPlaceRefs = (req, area, places) => {
  let placeRefs = places.map((place) => {
    return {name: place.name, url: Utils.getBaseUrl(req) + ':' + config.port + '/reach/place/id/' + place._id}
  });
  area['places'] = placeRefs;
  return area;
};

exports.getArea = (req,res) => {
   req.db.collection('area').findOne({name: req.params.name})
    .then((area) => {
      req.db.collection('place').find({area: new ObjectID(area._id)})
        .then((places) => {
          res.status(200).json(addPlaceRefs(req, area, places));
        });
    })
    .catch((err) => Utils.handleError(res, err.message, "Failed to get area"));
}