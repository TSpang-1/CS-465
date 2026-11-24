const express = require('express');
const router = express.Router();

// Import the trips controller
const tripsController = require('../controllers/trips');

// Define route for all trips
router
    .route('/trips')
    .get(tripsController.tripsList);

// Define route for an individual trip
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;