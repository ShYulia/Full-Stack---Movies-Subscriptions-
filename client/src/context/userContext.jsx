import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
 

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