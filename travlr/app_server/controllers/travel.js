const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

// GET travel view
const travel = async (req, res) => {
  try {
    const response = await fetch(tripsEndpoint, options);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const trips = await response.json();

    let message = null;

    if (!Array.isArray(trips)) {
      message = 'API lookup error';
    } else if (trips.length === 0) {
      message = 'No trips exist in our database';
    }

    res.render('travel', {
      title: 'Travlr Getaways',
      trips: Array.isArray(trips) ? trips : [],
      message: message
    });

  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { travel };