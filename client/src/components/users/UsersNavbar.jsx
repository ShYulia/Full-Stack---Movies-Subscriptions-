import { Link, Outlet} from 'react-router-dom';
const UsersNavbar = () => {
    return (
       
        <div className="max-w-4xl mx-auto p-6">
            <header className="bg-gray-700 py-4 rounded-t-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-white text-center">Users</h1>
                </div>
            </header>
            <nav className="bg-gray-500 shadow-md rounded-b-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    <div className="flex space-x-4">
                        <Link
                            to="allUsers"
                            className="text-gray-300 hover:bg-gray-600 hover:text-white py-2 px-4 rounded-md text-lg font-medium"
                        
                        >
                            All Users
                        </Link>
                        <Link
                            to="addUser"
                            className="text-gray-300 hover:bg-gray-600 hover:text-white py-2 px-4 rounded-md text-lg font-medium"
                        >
                            Add User
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="mt-4">
                <Outlet  />
            </div>
        </div>
    
    );
};

export default UsersNavbar