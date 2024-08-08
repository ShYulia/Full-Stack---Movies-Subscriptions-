import { useContext, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const MoviesNavbar = () => {
    const [text, setText] = useState('');
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const {user} = useContext(UserContext)
    
    const handleSearch = () => {
        setSearch(text);
        navigate('/movies/allMovies');
    };

    const handleClearSearch = () => {
        setSearch(''); 
        setText(''); 
        navigate('/movies/allMovies');
    };

    return (

    
        <div className="max-w-4xl mx-auto p-6">
            <header className="bg-gray-700 py-4 rounded-t-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-white text-center">Movies</h1>
                </div>
            </header>
            <nav className="bg-gray-500 shadow-md rounded-b-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    <div className="flex space-x-4">
                     { user.permissions.includes('viewMovies') &&
                          <Link
                            to="allMovies"
                            className="text-gray-300 hover:bg-gray-600 hover:text-white py-2 px-4 rounded-md text-lg font-medium"
                            onClick={handleClearSearch} // Handle clearing the search on click
                        >
                            All Movies
                        </Link>}
                        { user.permissions.includes('createMovies') &&
                            <Link
                            to="addMovie"
                            className="text-gray-300 hover:bg-gray-600 hover:text-white py-2 px-4 rounded-md text-lg font-medium"
                        >
                            Add Movie
                        </Link>}
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex items-center">
                            <label className="text-gray-300 mr-2 text-lg font-medium">Find Movie:</label>
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="rounded-md py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        >
                            Find
                        </button>
                    </div>
                </div>
            </nav>
            <div className="mt-4">
                <Outlet context={{ search }} />
            </div>
        </div>
     
    );
};
export default MoviesNavbar;
