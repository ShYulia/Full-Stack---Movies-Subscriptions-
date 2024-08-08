import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";


const AddSubscription = ({ watchedMovies, memberId, setAddNewSub, fetchWatchedMovies }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [notWatched, setNotWatched] = useState([]);
  const [newSub, setNewSub] = useState({ movieId: "", date: "" });
  const axiosInstance = useAxios();
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:8081/movies`)
        setAllMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (allMovies.length) {
      if (watchedMovies.length) {
        console.log(watchedMovies,'watched movies from sublist')
        const ids = watchedMovies.map(m => m.movie._id)
        const notWatchedMovies = allMovies.filter(
          (movie) => !ids.includes(movie._id)
        );
        setNotWatched(notWatchedMovies);
      } else setNotWatched(allMovies);
    }
  }, [allMovies, watchedMovies]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e)
    setNewSub((prev) => ({ ...prev, [name]: value }))
    
  };

  const handleSubscribe = async() => {
    const obj = {
      memberId: memberId,
      movies:[ {
        movieId: newSub.movieId,
        date: newSub.date,
      }],
    };
    const token = localStorage.getItem('accessToken')
   
    //the member already has subscriptions
    try{  if (watchedMovies.length) {
        const response = await axiosInstance.patch(`http://localhost:8081/subscriptions/${memberId}`, obj)
       setAddNewSub(false)}
       else { const response = await axiosInstance.post(`http://localhost:8081/subscriptions`, obj)}
       fetchWatchedMovies()
       setAddNewSub(false)   
   
    }catch(e) {
        console.log(e)
    } 
  };
  return (
    <form className="mt-8 space-y-6 border-color-red">
    <select  name="movieId" onChange={handleChange} value={newSub.movieId}>
       <option  value= {""} disabled>Please choose a movie</option>
        {notWatched.map((movie) => (
          <option key={movie._id}  value={movie._id} onChange={handleChange} >
            {movie.name}
          </option>
          
        ))}
     </select>
      <div>
        <label htmlFor="date" className="sr-only">
          Date:{" "}
        </label>
        <input
          id="date"
          type="date"
          name="date"
          onChange={handleChange}
          placeholder="Date"
        />
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <button
          type="button"
          onClick={handleSubscribe}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
};

export default AddSubscription;
