
// module.exports = cinemaDBConnection
const mongoose = require('mongoose');

// Create the first connection
const connection1 = mongoose.createConnection('mongodb://localhost:27017/cinemaDB', {
 
});

module.exports = connection1;