"use strict";
const mongodb = require('mongodb-bluebird'),
  config = require('../server/configuration'),
  jsonfile = require('jsonfile');

const url = config.MONGODB_URI;

const addOrUpdate = (sectors,sector,existingSector) => {
  if (existingSector) {
    console.log('Updated sector "' + sector.name + "'.");
    return sectors.update({_id: existingSector._id}, sector);
  } else {
    console.log('Added sector: ' + sector.name);
    return sectors.insert(sector);
  }
};

const processSectors = (db,file,callback) => {
  const sectors = db.collection('sector');
	jsonfile.readFile(file, (err, obj) => {
		const areaName = obj.area.name;
		const placeName = obj.area.place.name;
    console.log('================================================');
    console.log('Updating/adding sectors for ' + areaName + ':' + placeName);
    console.log('================================================');
		db.collection('area').findOne({name: areaName})
			.then((area) => {
				return db.collection('place').findOne({name: placeName, area: area._id});
			})
      .then((place) => {
        if (place) {
          return Promise.all(obj.area.place.sectors.map((sector) => {
            return sectors.findOne({name: sector.name, place: place._id})
              .then((es) => {
                sector['place'] = place._id;
                addOrUpdate(sectors, sector, es);
              })
          }))
        } else {
          console.log("ERROR: No place found with name '" + placeName + "'.");
          callback(null);
        }
      })
 			.then((result) => callback(result))
			.catch((e) => {
				console.log("ERROR: " + err);
				callback(e);
			})
    ;
	});
}

const add_sectors = (file) => {
	mongodb.connect(url, file)
		.then((db) => {
			processSectors(db, file, (result) => {
				db.close();
			});
		})
		.catch((err) =>  console.log("ERROR: " + err));
}

const file = process.argv[2];
add_sectors(file);

