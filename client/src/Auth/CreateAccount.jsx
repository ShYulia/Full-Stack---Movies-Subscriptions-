import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateAccount() {
  const [userName, setUserName] = useState('')
  const [password,setPassword] = useState('')
const navigate = useNavigate()

  const handleCreate = async () => {
  if (userName.trim === '' || password.trim()==='')
  {alert('Please enter username and password')
  return}
  else {
    const userData = {
        username:userName,
        password:password
    }
    try {
        const response = await axios.post('http://localhost:8080/create',userData)
        console.log(response)
        navigate('/')

    } catch(error){
        alert('Error during login')
        console.log('Error during login', error)
    }

  }
  } 

  return (
    <>
    <div className="min-h-screen flex justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an Account</h2>
      </div>
    <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">User Name</label>
              <input id="username" name="username" type="text" onChange={(e) => setUserName(e.target.value)} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="User Name"/>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"/>
            </div>
          </div>

          <div>
            <button type="button" onClick={handleCreate} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Create
            </button>
          </div>
        </form>
        </div>
        </div>
    </>
  )
}

export default CreateAccount