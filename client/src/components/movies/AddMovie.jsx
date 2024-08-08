import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

const AddMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const [movie, setMovie] = useState({
    name: "",
    genres: [],
    image: "",
    premiered: ""
  });

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        try {
          const response = await axiosInstance.get(`http://localhost:8081/movies/${id}`);
          setMovie({
            name: response.data.name,
            genres: response.data.genres,
            image: response.data.image,
            premiered: response.data.premiered.slice(0, 10)
          });
        } catch (error) {
          console.error('Error fetching movie:', error);
        }
      }
    };

    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'genres') {
      setMovie((prev) => ({
        ...prev,
        [name]: value.split(',').map((genre) => genre.trim())
      }));
    } else {
      setMovie((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      console.log(movie)
      await axiosInstance.post('http://localhost:8081/movies', movie);
      alert('Saved!');
      navigate('/movies/allMovies');
    } catch (error) {
      alert('Error!');
      console.error('Error saving movie:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`http://localhost:8081/movies/${id}`, movie);
      alert('Updated!');
      navigate('/movies/allMovies');
    } catch (error) {
      alert('Error!');
      console.error('Error updating movie:', error);
    }
  };

  const handleCancel = () => {
    navigate('/movies/allMovies');
  };

  return (
    <form className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="movieName" className="sr-only">Movie Name</label>
          <input
            id="movieName"
            name="name"
            type="text"
            value={movie.name}
            onChange={handleChange}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Movie Name"
          />
        </div>
        <div>
          <label htmlFor="genres" className="sr-only">Genres</label>
          <input
            id="genres"
            name="genres"
            type="text"
            value={movie.genres}
            onChange={handleChange}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Genres"
          />
        </div>
        <div>
          <label htmlFor="image" className="sr-only">Image URL</label>
          <input
            id="image"
            name="image"
            type="text"
            value={movie.image}
            onChange={handleChange}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Image URL"
          />
        </div>
        <div>
          <label htmlFor="premiered" className="sr-only">Premiered Date</label>
          <input
            id="premiered"
            name="premiered"
            type="date"
            value={movie.premiered}
            onChange={handleChange}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Premiered Date"
          />
        </div>
      </div>

      <div className="flex justify-end mt-4 space-x-2">
        {id && (
          <button
            type="button"
            onClick={handleUpdate}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update
          </button>
        )}
        {!id && (
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save
          </button>
        )}
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddMovie;
