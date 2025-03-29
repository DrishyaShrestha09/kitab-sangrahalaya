import { useEffect, useState } from "react";
import getBaseUrl from "../../utils/baseURL";
import axios from "axios";
import Loading from "./../../components/Loading";
import { useNavigate } from "react-router-dom";
import { MdIncompleteCircle } from "react-icons/md";
import RevenueChart from "./RevenueChart";
import { useFetchAllCampaignsQuery } from "../../redux/features/campaigns/campaignsApi";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate(); 
  const { data: revenueData, isLoading } = useFetchAllCampaignsQuery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  if (isLoading || loading) return <Loading />; 

  return (
    <>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">{data?.totalCampaign}</span>
            <span className="block text-gray-500">Campaigns</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <div>
            <span className="block text-2xl font-bold">
              ${revenueData?.totalFundRaised?.toLocaleString() ?? 0}
            </span>
            <span className="block text-gray-500">Total Funds Raised</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>
          </div>
          <div>
            <span className="inline-block text-2xl font-bold">
              {data?.emergencyCampaignResult}
            </span>
            <span className="inline-block text-xl text-gray-500 font-semibold">
              (1%)
            </span>
            <span className="block text-gray-500">
              Emergency Campaigns This Month
            </span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <MdIncompleteCircle className="size-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold">
              {data?.totalOrders}
            </span>
            <span className="block text-gray-500">Total Orders</span>
          </div>
        </div>
      </section>
      
      {/* Fund Raised Chart - Now full width below total orders */}
      <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
        <div className="flex flex-col md:col-span-4 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">
            The number of fund raised per month
          </div>
          <div className="p-4 flex-grow">
            <RevenueChart />
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
