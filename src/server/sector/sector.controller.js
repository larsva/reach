"use strict";

const ObjectID = require('mongodb').ObjectID;
const config = require('../configuration');
const Utils = require('../utils');

const addBoulderRefs = (req, sector, boulders) => {
  let boulderRefs = boulders.map((boulder) => {
    return {
      name: boulder.name,
      url: Utils.buildUrl(req,'/reach/boulder/id/' + boulder._id)
    }
  });
  sector['boulders'] = boulderRefs;
  return sector;
};

exports.getSector = (req,res) => {
  const db = req.db;
  db.collection('sector').findOne({_id: new ObjectID(req.params.id)})
    .then((sector) => {
      db.collection('boulder').find({sector: new ObjectID(sector._id)})
        .then((boulders) => {
          res.status(200).json(addBoulderRefs(req, sector, boulders));
        })
    })
    .catch((err) => Utils.handleError(res, err.message, "Failed to get sector"));
}