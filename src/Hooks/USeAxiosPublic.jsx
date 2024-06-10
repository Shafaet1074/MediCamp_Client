import axios from "axios";

export const axiosPublic = axios.create({
  baseURL:'https://medicamp-server-eosin.vercel.app'
})
const useAxiosPublic = () => {
      return axiosPublic;
};

export default useAxiosPublic;