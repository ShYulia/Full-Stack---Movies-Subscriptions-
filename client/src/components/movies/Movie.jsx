import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';
import SubList from "../subscriptions/SubList";

const Movie = ({ movie, onDelete}) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const axiosInstance = useAxios();

  const handleEdit = () => {
    navigate(`/movies/allMovies/${movie._id}`);
  };

  const handleDelete = async () => {
   
   onDelete(movie._id)
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h1 className="text-xl font-semibold text-gray-1000">{movie.name}</h1>
      <span className="text-sm text-gray-700">Genres: {movie.genres.join(", ")}</span>
      <br />
      <div className="flex">
        <div className="w-1.5/3">
          <img src={movie.image} alt={movie.name} className="w-full h-auto" />
        </div>
        <div className="w-1.5/3 pl-4">
          <SubList id={movie._id} flag='listOfMembers' />
        </div>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        {user.permissions.includes('updateMovies') && (
          <button
            type="button"
            onClick={handleEdit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Edit
          </button>
        )}
        {user.permissions.includes('deleteMovies') && (
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Movie;
