import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: " https://medicamp-server-dusky.vercel.app",
})
const useAxiosPublic = () => {
      return axiosPublic;
};

export default useAxiosPublic;