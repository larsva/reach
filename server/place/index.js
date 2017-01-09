"use strict"
const express = require('express');
const controller = require('./place.controller.js');

const router = express.Router();

//Endpoints

router.get('/:id', controller.getPlace);

module.exports = router;