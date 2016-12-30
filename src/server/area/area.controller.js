"use strict";
const config = require('../configuration');
const Utils = require('../utils');

const addPlaceRefs = (req, area, places) => {
  let placeRefs = places.map((place) => {
    return {name: place.name, url: Utils.buildUrl(req,'/reach/place/id/' + place._id)}
  });
  area['places'] = placeRefs;
  return area;
};

exports.getAreas = (req,res) => {
  const places = req.db.collection('place');
   req.db.collection('area').find()
    .then((areas) => {
      Promise.all(areas.map((area) => {
        places.find({area: area._id})
          .then((places) => {
            res.status(200).json(addPlaceRefs(req, area, places));
          });
      }))
     })
    .catch((err) => Utils.handleError(res, err.message, "Failed to get areas"));
}

exports.getArea = (req,res) => {
   req.db.collection('area').findOne({name: req.params.name})
    .then((area) => {
      req.db.collection('place').find({area: area._id})
        .then((places) => {
          res.status(200).json(addPlaceRefs(req, area, places));
        });
    })
    .catch((err) => Utils.handleError(res, err.message, "Failed to get area"));
}