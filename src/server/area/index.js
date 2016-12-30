"use strict"
const express = require('express');
const controller = require('./area.controller');

const router = express.Router();

//Endpoints

router.get('/', controller.getAreas);
router.get('/:name', controller.getArea);

module.exports = router;