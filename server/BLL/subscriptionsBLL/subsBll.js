const Subscription = require ('../../models/subscriptionsModels/subscriptionsModel')
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')

const getWatchedMovies = async (memberId) => {
  if (!memberId) {
    throw new Error('Invalid memberId provided');
  }

  try {
    //convert memberId to ObjectID
    const memberObjectId = ObjectId.createFromHexString(memberId);
    //find subscriptions of the member
   const subscriptions = await Subscription.find({ memberId: memberObjectId }).populate('movies.movieId');
   
   const movies = subscriptions.map(subscription=> 
    subscription.movies.map(movie =>
       ({movie:movie.movieId, date:movie.date})))
    
   return movies.flat()
  } catch (e) {
    console.error('Error fetching data:', e);
    throw new Error('Failed to fetch data');
  }
};
const getListOfMembers = async(movieId) =>{
  if (!movieId) {
    throw new Error('Invalid movieId provided');
  }
  try{
    //convert movieID to Object Id
    const movieObjectId = ObjectId.createFromHexString(movieId)
   //find all the the subscriptions with the given movieId
     const subscriptions = await Subscription.find({ 'movies.movieId': movieObjectId }).populate('memberId');
     const result= subscriptions.map(subscription => 
   { 
    //find the movie with the given id
    const movieDetails = subscription.movies.find(m => m.movieId.equals(movieObjectId))
    return {
      member:subscription.memberId,
      movieId:movieDetails.movieId,
      date:movieDetails.date
    }
   }
  )
  
  return(result)
  }catch(e){
    console.error('Error fetching data:', e);
    throw new Error('Failed to fetch data');
  }

}
  const  createSub =async (obj) => {
 const sub = new Subscription(obj)
 await sub.save()
 return 'created!'
  }

 const updateSub = async(id, obj) =>{

  const memId = ObjectId.createFromHexString(id)
  const objTopush = {
   movieId: ObjectId.createFromHexString(obj.movies[0].movieId),
   date:obj.movies[0].date
   }
  
  try {  const result = await Subscription.findOneAndUpdate(
    {memberId:memId},
    {$push:{movies:objTopush}},
    {new:true}
  ) 
  if(!result)  {
    return('Subscription is not found for the given memberId')}
    
  else {
    console.log('Updated Subscription')
    return "Updated"
  }}catch(e) {
    console.log(e)
  }
 }

   module.exports = {getWatchedMovies, createSub,updateSub, getListOfMembers} 