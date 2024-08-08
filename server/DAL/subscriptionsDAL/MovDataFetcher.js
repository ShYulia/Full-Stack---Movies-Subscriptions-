const axios = require('axios')
const Movie = require('../../models/subscriptionsModels/movieModel')
const Status = require('../../models/subscriptionsModels/statusModel')

 fetchMoviesAndSave = async () => {

  
    try{
      const status = await Status.findOne({ name: 'moviesFetched' });
      if (status && status.value === true) {
        console.log('Movies have already been fetched and saved.');
        return;}
     
        const moviesRes = await axios.get('https://api.tvmaze.com/shows')
        const moviesData = moviesRes.data
        await Movie.deleteMany({});
       moviesData.map((movie) => {
        
      const movieTosave = {
        name:movie.name,
        genres: movie.genres,
        image: movie.image.original,
        premiered:movie.premiered
      }
    
      
    Movie.create(movieTosave) 

    })
   // Update the status in the database
   if (status) {
    status.value = true;
    await status.save();
  } else {
    await Status.create({ name: 'moviesFetched', value: true });
  }
    }catch(error){
    console.error(error)
    }


}
module.exports =  fetchMoviesAndSave;