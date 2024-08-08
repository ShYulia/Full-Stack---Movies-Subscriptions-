 const Movie = require('../../models/subscriptionsModels/movieModel')
 const Subscription = require ('../../models/subscriptionsModels/subscriptionsModel')
 const mongoose = require('mongoose');
 const getMovies = async () => {
 const movies = await Movie.find({})
 return movies
 }

 const getMovie = async (id) => {
    const movie = await Movie.findById(id)
    return movie
 }

 const updateMovie = async (id, obj) => {
   const movie = await Movie.findByIdAndUpdate(id,obj)
   return 'Updated!'
}
const createMovie = async (obj) => {
   const movie = new Movie(obj)
   await movie.save()
   return 'Created!'
}

const deleteMovie = async (id) => {
   try{const movie = await Movie.findByIdAndDelete(id)}
   catch(e){
      console.log(e, 'Error deleting movie')
      return('Error deleting movie')
   }
   
   //find movie in subscriptions and delete it there
   try{  const result = await Subscription.updateMany(
      {'movies.movieId':id},
      {$pull:{movies:{movieId:id}}}
     )
     if (result.modifiedCount === 0) {
      console.log('No subscriptions updated');
    }
   }
     catch(e){
      console.log(e,'Error removing movie from subscriptions')
     }

   return 'Deleted!'
}
 module.exports = {getMovies, getMovie, updateMovie, createMovie, deleteMovie}