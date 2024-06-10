
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useCamps from '../../../Hooks/useCamps';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';


const Analytics = () => {
  const axiosSecure=useAxiosSecure();
 
  const {data:camps=[]} =useQuery({
    queryKey:['camps'],
    queryFn:async ()=>{
  const res=await axiosSecure.get('/camps');
    
      console.log(res.data);
      return res.data
    }
    })

    // Transform the data to a format suitable for the chart
    const chartData = camps.map(camp => ({
        campname: camp?.campname,
        fees: camp.campfees,
        participants:camp.
        Participantcount
 
    }));

  console.log(camps);  
  console.log(chartData);
    return (
       <div>
        <div className="lg:p-10 lg:text-center lg:space-y-4 space-y-8">
        <h2 className="lg:text-5xl text-xl text-black lg:text-center font-bold pt-5">
        View Your <span className="text-green-800"> Camps Analytics</span>
        </h2>
     
      </div>
         <div className='pt-5' style={{ width: '100%', height: 400 }}>
           
            <ResponsiveContainer>
                <BarChart
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="campname" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="fees" fill="#8884d8" />
                    <Bar dataKey="participants" fill="#82ca9d" />
                    <Bar dataKey="name" fill="#82ca9d" />
                    
                </BarChart>
            </ResponsiveContainer>
        </div>
       </div>
    );
};

export default Analytics;