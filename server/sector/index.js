"use strict"
const express = require('express');
const controller = require('./sector.controller.js');

const router = express.Router();

//Endpoints

router.get('/id/:id', controller.getSector);

module.exports = router;