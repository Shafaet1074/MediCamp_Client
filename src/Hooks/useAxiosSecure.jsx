import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Components/Providers/AuthProviders';

export const axiosSecure = axios.create({
  baseURL: 'http://localhost:5005', // Update with your backend URL
});

const useAxiosSecure = () => {
  const navigate= useNavigate();
  const {LogOut} = useContext(AuthContext)
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access-token');
      console.log('Token retrieved:', token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

    axiosSecure.interceptors.response.use(function (response) {
      return response;
  }, async (error) => {
      const status = error.response.status;
      console.log('status error in the interceptor', status);
      // for 401 or 403 logout the user and move the user to the login
      if (status === 401 || status === 403) {
          await LogOut();
          navigate('/login');
      }
      return Promise.reject(error);
  })

  return axiosSecure;
};

export default useAxiosSecure;