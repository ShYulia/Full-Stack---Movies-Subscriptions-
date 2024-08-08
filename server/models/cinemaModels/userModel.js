const mongoose = require('mongoose')
const connection1 = require('../../configs/cinemaDb')

const UserSchema = new mongoose.Schema({
   username: String,
    password: String,
    role: String
})

const User = connection1.model('user', UserSchema)

module.exports = User