import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import AddSubscription from "./AddSubscription";

const SubList = ({ id, flag }) => {
  const axiosInstance = useAxios();
  const [items, setItems] = useState([]);
  const [addNewSub, setAddNewSub] = useState(false);

  const fetchItems = async () => {
    try {
      let response;
      if (flag === 'listOfMovies') {
        response = await axiosInstance.get(`http://localhost:8081/subscriptions/?memberId=${id}`)
      } else if (flag === 'listOfMembers') {
        response = await axiosInstance.get(`http://localhost:8081/subscriptions/?movieId=${id}`);
      } else {
        console.error('Invalid flag value');
        return;
      }
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [id, flag]);

  const addSub = () => {
    setAddNewSub(true);
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-md p-6 mb-4">
        {flag === 'listOfMovies' && (
          <>
          <h1 className="text-xl font-semibold text-gray-1000">Movies Watched</h1>
            <button
              type="button"
              onClick={addSub}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Subscribe to new movie
            </button>
            <br />
            {addNewSub && (
              <AddSubscription
                watchedMovies={items}
                memberId={id}
                fetchWatchedMovies={fetchItems}
                setAddNewSub={setAddNewSub}
              />
            )}
          
          </>
        )}
        {flag === 'listOfMembers' && (
          <h1 className="text-xl font-semibold text-gray-1000">Subscriptions Watched</h1>
        )}
        <ul className="list-disc pl-5">
          {items.length > 0 ? (
            items.map((item,index) => (
              <li className="text-lg text-gray-700" key={index}>
                {item.movie?.name || item.member?.name}, {new Date(item.date).toLocaleDateString()}
              </li>
            ))
          ) : (
            <li className="list-none">
              {flag === 'listOfMovies' ? 'No movies watched' : 'No members watched'}
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default SubList;
