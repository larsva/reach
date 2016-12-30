"use strict";
const mongodb = require('mongodb-bluebird'),
	config = require('../server/configuration'),
	jsonfile = require('jsonfile');

const url = config.MONGODB_URI;

const addOrUpdate = (boulders,boulder,existing) => {
	if (existing) {
		console.log('Updated boulder "' + boulder.name + '".');
		return boulders.update({_id: existing._id}, boulder);
	} else {
		console.log('Inserted boulder "' + boulder.name + '".');
		return boulders.insert(boulder);
	}
};

const processBoulders = (db,file,callback) => {
	const boulders = db.collection('boulder');
	jsonfile.readFile(file, (err, obj) => {
		const areaName = obj.area.name;
		const placeName = obj.area.place.name;
		const sectorName = obj.area.place.sector.name;
		console.log('================================================');
		console.log('Updating/adding boulders for ' + areaName + ':' + placeName + ':' + sectorName);
		console.log('================================================');

		db.collection('area').findOne({name: areaName})
			.then((area) => {
				return db.collection('place').findOne({name: placeName, area: area._id});
			})
			.then((place) => {
				return 	db.collection('sector').findOne({name: sectorName, place: place._id});
			})
			.then((sector) => {
				return Promise.all(obj.area.place.sector.boulders.map((boulder) => {
					return boulders.findOne({name: boulder.name, sector: sector._id})
						.then((eb) => {
							boulder['sector'] = sector._id;
							addOrUpdate(boulders,boulder,eb);
						})
				}))
			})
			.then((result) => callback(result))
			.catch((e) => {
				console.log("ERROR: " + err);
				callback(e);
			})
		;
	});
}

const add_boulders = (file) => {
	mongodb.connect(url, file)
		.then((db) => {
			processBoulders(db, file, (result) => {
				db.close();
			});
		})
		.catch((err) =>  console.log("ERROR: " + err));
}

const file = process.argv[2];
add_boulders(file);

