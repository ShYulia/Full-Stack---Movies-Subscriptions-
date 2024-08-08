import { useEffect, useState, useContext } from "react";
import { useOutletContext, useNavigate } from 'react-router-dom';
import useAxios from "../../hooks/useAxios";
import Movie from './Movie';
import { UserContext } from '../../context/userContext'




const AllMovies = () => {
    const { search } = useOutletContext();
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
     const axiosInstance = useAxios();
    

    // Fetch movies data from the API
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axiosInstance.get('http://localhost:8081/movies');
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, [movies]);

    // Filter movies based on searchText
    useEffect(() => {
        if (search) {
            const filtered = movies.filter(movie => movie.name.toLowerCase().includes(search.toLowerCase()));
            setFilteredMovies(filtered);
        } else {
            setFilteredMovies(movies);
        }
    }, [search, movies]);

    const handleDelete = async(id) => {
        try {
          await axiosInstance.delete(`http://localhost:8081/movies/${id}`);
          setMovies(movies.filter((m)=> m._id !== id))
          alert('Deleted!');
        } catch (error) {
          alert('Error deleting movie');
          console.error('Error deleting movie:', error);
        }
    }

    // Render the list of movies (either filtered or all)
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md-grid-cols-3 lg-grid-cols-4 gap-4">
            {filteredMovies.map((movie) => (
                <li key={movie._id} className="bg-white shadow-md rounded-md p-4">
                    <Movie movie={movie}  onDelete={handleDelete} />
                </li>
            ))}
        </ul>
    );
};

export default AllMovies;
