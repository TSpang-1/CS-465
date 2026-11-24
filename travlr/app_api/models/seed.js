const mongoose = require('./db');
const Trip = require('./travlr');
const fs = require('fs');

// Read seed data from JSON file
const trips = JSON.parse(
    fs.readFileSync('./data/trips.json', 'utf8')
);

// Delete existing records, then insert seed data
const seedDB = async () => {
    try {
        await mongoose.connection.asPromise();
        await Trip.deleteMany({});
        await Trip.insertMany(trips);

        console.log(`Successfully seeded ${trips.length} trips.`);
    } catch (err) {
        console.error('Database seeding failed:', err);
        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();
    }
};

seedDB();