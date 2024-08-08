import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

const useAxios = () => {
  const { user, logout } = useContext(UserContext);
  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use(
    (config) => {
      if (user.accessToken && isTokenExpired(user.accessToken)) {
        logout();
        return Promise.reject('Token expired');
      } else if (user.accessToken) {
        config.headers['Authorization'] = user.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  return axiosInstance;
};

const isTokenExpired = (token) => {
  if (!token) {
    return true; // If no token, consider it expired
  }
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;
    return Date.now() > expiry;
  } catch (e) {
    console.log('error', e);
    return true;
  }
};

export default useAxios;
