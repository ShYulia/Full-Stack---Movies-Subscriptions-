const mongoose = require('mongoose')
const connection2 = require('../../configs/subscriptionsDb');

const MemberSchema = new mongoose.Schema({
    name: String,
    email: String,
    city: String

})

const Member =connection2.model('Member', MemberSchema )

module.exports = Member