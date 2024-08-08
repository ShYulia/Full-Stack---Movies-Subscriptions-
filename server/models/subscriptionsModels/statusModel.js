const mongoose = require('mongoose')
const connection2 = require('../../configs/subscriptionsDb');

const StatusSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    value: { type: Boolean, required: true }

})
const Status = connection2.model('Status', StatusSchema)

module.exports = Status