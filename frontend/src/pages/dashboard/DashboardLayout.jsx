import React, { useEffect, useState } from 'react'
import getBaseUrl from '../../utils/baseURL';
import axios from 'axios';
import Loading from '../../components/Loading';

const DashboardLayout = () => {
    const [loading, setLoading] = useState (true);
    const [data, setData] = useState ({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/api/admin`, {
                    headers: {
                        'Authoriation': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                })

                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error:' ,error);
                setLoading(false);
            }
        }
    }, []);
    if (loading) return <Loading/>
  return (
    <div>
      <h1>This is dashboard page</h1>
    </div>
  )
}

export default DashboardLayout
