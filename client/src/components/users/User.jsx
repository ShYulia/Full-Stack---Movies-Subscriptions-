import { useNavigate } from 'react-router-dom';
import useAxios from "../../hooks/useAxios";
import React from 'react';

const User = ({ user, onDelete }) => {
const navigate = useNavigate()
const axiosInstance = useAxios();
const handleEdit = () => {
  navigate(`/users/EditUser/${user.id}`)
}

const handleDelete = () => {
       onDelete(user.id)
       }


  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h1 className="text-xl font-semibold text-gray-1000">Name: {user.lname} {user.fname}</h1>
      <h1 className="text-xl font-semibold text-gray-1000">User Name: {user.username}</h1>
      <h1 className="text-xl font-semibold text-gray-1000">Session time out (Minutes): {user.sessionTime}</h1>
      <h1 className="text-xl font-semibold text-gray-1000">Created Date: {user.createdDate}</h1>
      <div>
        <h1 className="text-xl font-semibold text-gray-1000">Permissions:</h1>
        <ul className="list-disc pl-4">

          
          {
            user.permissions.map((permission, index) => (
            <li key={index} className="text-lg text-gray-800">{permission}</li>
          ))}
        </ul>
      </div>
      <button type='button' onClick={handleEdit} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">Edit</button>
      <button type='button' onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">Delete</button>
      
    </div>
  );
}

export default User;
