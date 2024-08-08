const mongoose = require('mongoose')
const connection2 = require('../../configs/subscriptionsDb');

const SubscriptionSchema = new mongoose.Schema({
    memberId:  {type:mongoose.Schema.Types.ObjectId, ref:'Member'},
    movies: [{
        movieId: {type:mongoose.Schema.Types.ObjectId, ref:'Movie'},
        date: Date
    }],
   
})

const Subscription = connection2.model('Subscription', SubscriptionSchema)

module.exports = Subscription