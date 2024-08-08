import { useNavigate } from "react-router-dom"
import SubList from "./SubList"
import { useContext} from 'react';
import { UserContext } from '../../context/userContext';
import useAxios from "../../hooks/useAxios";

const Member = ({member, onDelete}) =>{
    const axiosInstance = useAxios();
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    const handleEdit = () =>{
        navigate(`/subscriptions/allMembers/${member._id}`)
    }
   const handleDelete = () =>{
    onDelete(member._id)
  
    }
    return (  <div className="bg-white shadow-md rounded-md p-4 mb-4">
    <h1 className="text-xl font-semibold text-gray-1000">{member.name}</h1>

<span className="text-sm text-gray-700">Email: {member.email}</span><br/>
<span className="text-sm text-gray-700">City: {member.city}</span><br/>
    <div className="flex justify-end mt-4 space-x-2">
  { user.permissions.includes('updateSubscriptions') &&
     <button type='button' onClick={handleEdit} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">Edit</button>}

    {user.permissions.includes('deleteSubscriptions') &&
        <button type='button' onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">Delete</button>}
    </div>
    <SubList id={member._id} flag='listOfMovies' />
</div>)
    
    }
    export default Member