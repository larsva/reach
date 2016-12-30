"use strict"
const express = require('express');
const controller = require('./boulder.controller.js');

const router = express.Router();

//Endpoints

router.get('/id/:id', controller.getBoulder);

module.exports = router;