"use strict"
const express = require('express');
const controller = require('./area.controller');

const router = express.Router();

//Endpoints

router.get('/', controller.getAllAreas);
router.get('/:id', controller.getAreaById);

module.exports = router;