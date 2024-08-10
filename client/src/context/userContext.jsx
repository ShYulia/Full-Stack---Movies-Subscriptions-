import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState(() => {
  //   // Check sessionStorage for user data
  //   const storedUser = sessionStorage.getItem('user');
  //   return storedUser ? JSON.parse(storedUser) : { id: '', permissions: [] };
  // });
  
  // useEffect(() => {
  //   // Update sessionStorage whenever the user state changes
  //   sessionStorage.setItem('user', JSON.stringify(user));
  // }, [user]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState()

  const logout = async () => {

       try {
        const response = await axios.post('http://localhost:8080/logout',user)
        setIsLoggedIn(false)
        sessionStorage.clear();
        window.location.href = '/';
       }catch(e){
        console.log(e)
       }

    
    
    window.location.href = '/'
      
}

  return (
    <UserContext.Provider value={{ user, setUser,isLoggedIn,setIsLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};