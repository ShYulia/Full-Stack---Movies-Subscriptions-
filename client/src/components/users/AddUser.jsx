import {  useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

const AddUser = () => {
  const axiosInstance = useAxios();
  const navigate = useNavigate()
  const [user, setUser] = useState({
    fname:"",
    lname:"",
    username:"",
    sessionTime:"",
  permissions:[]
  }); 

 const handleChange = (e) =>{
  const {name, value, checked} = e.target

  if (name === 'permissions'){
    if(checked) {
      
      setUser((prev) => 
      (
        {
          ...prev, permissions:[...prev.permissions, value]
        }
      ))
      if (user.permissions.includes
        ('createSubscriptions' || 'updateSubscriptions'
        || 'deleteSubscriptions')
        && !user.permissions.includes('viewSubscriptions')){
          
          setUser((prev) => ({
             ...prev, permissions:[...prev.permissions, 'viewSubscriptions'] 
          }))
      }
      if (user.permissions.includes
        ('createMovies' || 'updateMovies'
        ||'deleteMovies')
        && !user.permissions.includes('viewMovies')){
          
          setUser((prev) => ({
             ...prev, permissions:[...prev.permissions, 'viewMovies'] 
          }))
      }

    }else {
      setUser((prev) => ({
        ...prev, permissions:prev.permissions.filter(permission => permission!== value)
      }))
      }
  
  } else
 { setUser((prev) => ({...prev, [name]:value}) )}
 }



 const handleSave = async () => {
 
   
    try { 
    const response = await axiosInstance.post(`http://localhost:8080/users`, user)
    console.log(response)
    navigate('/users/allUsers')
  }
   catch(e) {
    console.error(e)
   }
};

  return (
 
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="fname" className="sr-only">First Name</label>
              <input
                id="fname"
                name="fname"
                type="text"
                value={user.fname}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
              />
            </div>
            <div>
            <label htmlFor="lname" className="sr-only">Last Name</label>
            <input
              id="lname"
              name="lname"
              type="text"
              value={user.lname}
              onChange={handleChange}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Last Name"
            />
          </div>
          <div>
          <label htmlFor="username" className="sr-only">User Name</label>
          <input
            id="username"
            name="username"
            type="text"
            value={user.username}
            onChange={handleChange}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="User Name"
          />
        </div>
        <div>
        <label htmlFor="role" className="sr-only">Role</label>
        <select
          id="role"
          name="role"
          type="text"
          value={user.role}
          onChange={handleChange}
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Role"
        >
        <option defaultValue="user" disabled >Select Role</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        </select>
      </div>
        <div>
        <label htmlFor="sessionTime" className="sr-only">Session Time Out (Minutes)</label>
        <input
          id="sessionTime"
          name="sessionTime"
          type="number"
          value={user.sessionTime}
          onChange={handleChange}
          required
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Session Time Out (Minutes)"
        />
      </div>
      <div>
      <input 
        id="viewSubscriptions"
        value="viewSubscriptions"
        name='permissions'
        type="checkbox"
        checked={user.permissions.includes("viewSubscriptions")}
        onChange={handleChange}
        className="rounded-md text-indigo-600 focus:ring-indigo-500 h-4 w-4"
      />
      <label htmlFor="viewSubscriptions" className="ml-2">View Subscriptions</label>
    </div>
    <div>
    <input 
      id="createSubscriptions"
      value="createSubscriptions"
      type="checkbox"
      name = 'permissions'
      onChange={handleChange}
      className="rounded-md text-indigo-600 focus:ring-indigo-500 h-4 w-4"
    />
    <label htmlFor="createSubscriptions" className="ml-2">Create Subscriptions</label>
  </div>
  <div>
  <input 
    id="deleteSubscriptions"
    value="deleteSubscriptions"
    type="checkbox"
    name='permissions'
    onChange={handleChange}
    className="rounded-md text-indigo-600 focus:ring-indigo-500 h-4 w-4"
  />
  <label htmlFor="deleteSubscriptions" className="ml-2">Delete Subscriptions</label>
</div>
<div>
<input 
  id="updateSubscriptions"
  value="updateSubscriptions"
  type="checkbox"
  name='permissions'
  onChange={handleChange}
  className="rounded-md text-indigo-600 focus:ring-indigo-500 h-4 w-4"
/>
<label htmlFor="updateSubscriptions" className="ml-2">Update Subscriptions</label>
</div>
<div>
<input 
id="viewMovies"
value="viewMovies"
type="checkbox"
name='permissions'
checked={user.permissions.includes('viewMovies')}
onChange={handleChange}
className="rounded-md text-indigo-600 focus:ring-indigo-500 h-4 w-4"
/>
<label htmlFor="viewMovies" className="ml-2">View Movies</label>
</div>
<div>
<input 
id="createMovies"
value="createMovies"
type="checkbox"
name="permissions"
onChange={handleChange}
className="rounded-md text-indigo-600 focus:ring-indigo-500 h-4 w-4"
/>
<label htmlFor="createMovies" className="ml-2">Create Movies</label>
</div>
<div>
<input 
id="deleteMovies"
value="deleteMovies"
type="checkbox"
name= 'permissions'
onChange={handleChange}
className="rounded-md text-indigo-600 focus:ring-indigo-500 h-4 w-4"
/>
<label htmlFor="deleteMovies" className="ml-2">Delete Movies</label>
</div>
<div>
<input 
id="updateMovies"
value="updateMovies"
type="checkbox"
name="permissions"
onChange={handleChange}
className="rounded-md text-indigo-600 focus:ring-indigo-500 h-4 w-4"
/>
<label htmlFor="updateMovies" className="ml-2">Update Movies</label>
</div>
      <button
      type="button"
      onClick={handleSave}
      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      Save
    </button>
          </div>
        </form>
  
  );
};

export default AddUser;
