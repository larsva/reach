"use strict";
const config = require('../configuration');
const Utils = require('../utils');


const addPlaceRefs = (req, area, places) => {
  let placeRefs = places.map((place) => {
    return {name: place.name, id: place._id, problems: place.problems, geoLocation: place.geoLocation}
  });
  area['places'] = placeRefs;
  let problems = placeRefs.reduce((prev,place) => prev + place.problems,0);
  area['problems'] = problems;
  return area;
};

const countProblems = (db,query) => {
  return db.collection('boulder').count(query);
};

const countPlaceProblems = (db,place) => {
  return countProblems(db, {place: place._id})
    .then ((count) => {
       return new Promise((resolve,reject) => {
         resolve({name: place.name, id: place._id, problems: count, geoLoctaion: place.geoLocation});
       })
    })
};

exports.getAllAreas = (req, res) => {
  const db = req.db;
  const places = db.collection('place');
  req.db.collection('area').find()
    .then((areas) => {
      return Promise.all(areas.map((area) => {
          return places.find({area: area._id})
            .then((result) => {
              return Promise.all(result.map((place) => {
                return countPlaceProblems(db,place);
              }))
            })
            .then((placeRefs) => {
              area['places'] = placeRefs;
              return new Promise((resolve, reject) => {
                resolve(area);
              })
            })
      }))
    })
    .then((areas) => {
      return Promise.all(areas.map((area) => {
        let problems = area.places.reduce((prev,place) => prev + place.problems,0);
        console.log('Problems: ' + problems);
        area['problems'] = problems;
        console.log(' Area: ' + JSON.stringify(area));
        return new Promise((resolve,reject) => {
          resolve(area);
        })
       }))
    })
    .then((areas) => {
      res.status(200).json(areas);
    })
    .catch((err) => Utils.handleError(res, err, "Failed to get areas"));
}

exports.getAreaById = (req, res) => {
  const places = req.db.collection('place');
  const boulders = req.db.collection('boulder');
  let area;
  req.db.collection('area').findOne({_id: req.params.id})
    .then((a) => {
      area = a;
      console.log('Area: ' + JSON.stringify(area));
      return places.find({area: area._id});
    })
    .then((places) => {
      return Promise.all(places.map((place) => {
        return boulders.count({place: place._id})
          .then((count) => {
            place['problems'] = count;
            return new Promise((resolve,reject) => {
              resolve(place);
            })
          })
      }))
    })
    .then((places) => {
      res.status(200).json(addPlaceRefs(req, area, places));
    })
    .catch((err) => Utils.handleError(res, err, "Failed to get area"));
}