import axios, {
    AxiosError,
    AxiosResponse,
  } from 'axios';
import { getLocalStorageItem } from '../localStorageItem';

  const useAxios = () =>{
    const token = getLocalStorageItem("token");
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });
    // eslint-disable-next-line
      axiosInstance.interceptors.request.use((config: any ): any => {

      config.headers['Accept'] = 'application/json';
      config.headers['Content-Type'] = 'application/json';
      config.headers.Authorization = token ? `Bearer ${token}` : null ;
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
    );

    axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      return response;
    },
    // eslint-disable-next-line
        (error: any) => {
      return Promise.reject(error);
    }
    );

    return axiosInstance
  }
  export default useAxios;