import axios from "axios";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/Providers/AuthProviders";

export const axiosSecure = axios.create({
  baseURL: " https://medicamp-server-dusky.vercel.app",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { LogOut } = useContext(AuthContext);

  useEffect(() => {
    // REQUEST interceptor
    const requestIntercept = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // RESPONSE interceptor
    const responseIntercept = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response?.status;
        console.log("Interceptor Status:", status);

        if (status === 401 || status === 403) {
          // Trigger safe logout event
          window.dispatchEvent(new CustomEvent("force-logout"));
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestIntercept);
      axiosSecure.interceptors.response.eject(responseIntercept);
    };
  }, []);

  // Listen for logout event
  useEffect(() => {
    const handler = async () => {
      await LogOut();
      navigate("/login");
    };

    window.addEventListener("force-logout", handler);

    return () => window.removeEventListener("force-logout", handler);
  }, [LogOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
