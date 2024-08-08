import { useEffect, useState, useContext } from 'react'
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';
import Login from './Auth/Login'
import AllMovies from './components/movies/AllMovies'
import './index.css';
import CreateAccount from './Auth/CreateAccount';
import Navbar from './components/Navbar';
import AddMovie from './components/movies/AddMovie';
import MoviesNavbar from './components/movies/MoviesNavbar';
import UsersNavbar from './components/users/UsersNavbar';
import AllUsers from './components/users/AllUsers';
import AddUser from './components/users/AddUser';
import EditUser from './components/users/EditUser';
import AllMembers from './components/subscriptions/AllMembers'
import MembersNavbar from './components/subscriptions/MembersNavbar';
import AddMember from './components/subscriptions/AddMember';
import useAxios from "./hooks/useAxios";
import { UserContext } from "./context/userContext"

function App() {
  const { user, setIsLoggedIn, isLoggedIn } = useContext(UserContext);
  const axiosInstance = useAxios();


  const sendHeartbeat = async () => {
    try {
      await axiosInstance.post('http://localhost:8080/heartbeat', user);
      console.log('Heartbeat sent');
    } catch (e) {
      console.log('heartbeat failed: ', e);
    }
  };

  useEffect(() => {
    if (isLoggedIn){    const heartbeatInterval = setInterval(sendHeartbeat, 60000);
      return () => clearInterval(heartbeatInterval);}
  }, [isLoggedIn]);
  

  return (
    <>
  <BrowserRouter>
    <Navbar />
    <Routes>    
    <Route path="/" element={<Login/>} />
    <Route path="/create-account" element={<CreateAccount />} />
    <Route path="/movies/*" element={<MoviesNavbar />} > 
    <Route path="addMovie" element={<AddMovie />} />
    <Route path="allMovies/:id" element={<AddMovie />} />
    <Route path="allMovies" element={<AllMovies />} />
    </Route>
    <Route path="/users/*" element={<UsersNavbar />} >
    <Route path="allUsers" element={<AllUsers />} />
    <Route path="addUser" element={<AddUser />} />
    <Route path="EditUser/:id" element={<EditUser />} />
    </Route>
    <Route path="/subscriptions/*" element={<MembersNavbar />} >
    <Route path="allMembers" element={<AllMembers />} />
    <Route path="allMembers/:id" element={<AddMember />} />
    <Route path="addMember" element={<AddMember />} />
    </Route>
  </Routes>
  </BrowserRouter>
 

    </>
  )
}

export default App
