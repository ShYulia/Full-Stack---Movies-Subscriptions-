const mongoose = require('mongoose')
const connection2 = require('../../configs/subscriptionsDb');

const MovieSchema = new mongoose.Schema({
    name: String,
    genres: [String],
    image: String,
    premiered: Date

})

const Movie = connection2.model('Movie', MovieSchema)

module.exports = Movie