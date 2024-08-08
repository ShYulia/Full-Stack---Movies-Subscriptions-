

const mongoose = require('mongoose');

// Create the first connection
const connection2 = mongoose.createConnection('mongodb://localhost:27017/subscriptionsDB', {
  
});

module.exports = connection2;