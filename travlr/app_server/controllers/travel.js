
const fs = require('fs');

const travel = (req, res) => {
  const trips = JSON.parse(
    fs.readFileSync('./data/trips.json', 'utf8')
  );

  res.render('travel', {
    title: 'Travlr Getaways',
    trips: trips
  });
};

module.exports = { travel };
