import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});


axiosInstance.interceptors.response.use(
    (res: any) => res,
    (error: any) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;



export const fetcher = (url: string) => axiosInstance.get(url).then((res: any) => res.data);
