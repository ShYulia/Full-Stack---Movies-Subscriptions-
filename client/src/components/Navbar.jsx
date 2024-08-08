import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Navbar = () => {
  const {user,logout,isLoggedIn} = useContext(UserContext)

  return (
    <>
      {isLoggedIn && (
        <>
      
          <header className="bg-gray-800 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-blue-500 text-center">
                  Movies - Subscriptions Web Site
              </h1>
            </div>
          </header>
      
          <nav className="bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
              <div className="flex">
              { user.permissions.includes('viewMovies') &&
                <Link
                to="/movies"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white py-2 px-4 rounded-md text-lg font-medium"
                >
                  Movies
                </Link>
              }
              { user.permissions.includes('viewSubscriptions') &&
                <Link
               to='/subscriptions'
                className="text-gray-300 hover:bg-gray-700 hover:text-white py-2 px-4 rounded-md text-lg font-medium"
              >
               Subscriptions
              </Link>
              }
              { user.role === 'admin' &&
                <Link
                  to="/users"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white py-2 px-4 rounded-md text-lg font-medium"
                >
                  Users Management
                </Link>
              }
                <Link
                to="#"
                onClick={logout}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white py-2 px-4 rounded-md text-lg font-medium"
                >
                  Logout
                </Link>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default Navbar;
