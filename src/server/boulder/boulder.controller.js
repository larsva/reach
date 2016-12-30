"use strict";

const ObjectID = require('mongodb').ObjectID;
const Utils = require('../utils');

exports.getBoulder = (req,res) => {
  const db = req.db;
  db.collection('boulder').findOne({_id: new ObjectID(req.params.id)})
    .then((boulder) => res.status(200).json(boulder))
    .catch((err) => Utils.handleError(res, err.message, "Failed to get boulder"));
}