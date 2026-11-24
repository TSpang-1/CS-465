const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    try {
        const q = await Model
            .find({})
            .exec();

        // console.log(q);

        if (!q) {
            // Database returned no data
            return res
                .status(404)
                .json({ message: 'No trips found' });
        } else {
            // Return resulting trip list
            return res
                .status(200)
                .json(q);
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: err.message });
    }
};

// GET: /trips/:tripCode - returns a single trip
const tripsFindByCode = async (req, res) => {
    try {
        const q = await Model
            .find({ code: req.params.tripCode })
            .exec();

        if (!q || q.length === 0) {
            return res
                .status(404)
                .json({ message: 'Trip not found' });
        } else {
            return res
                .status(200)
                .json(q);
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: err.message });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};