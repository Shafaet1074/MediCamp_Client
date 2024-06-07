


import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Components/Providers/AuthProviders";
import { useContext } from "react";


const useCamps = () => {
    const axiosSecure = useAxiosSecure();
    const {user} =useContext(AuthContext);
    console.log(user.email);

    const { refetch, data: hookcamps = [] } = useQuery({
        queryKey: ['campshook'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`);
            return res.data;
        }
        
    })
    console.log(hookcamps);

    

    return [hookcamps, refetch]
};

export default useCamps;
