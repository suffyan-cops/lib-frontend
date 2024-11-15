import axios, { AxiosError } from 'axios';
import useAxios from './axiosConfig';


/*eslint-disable */
  export const getCall = async ( endpoint:string, data={} ) => {
   const axiosInstance = useAxios()
    try {
      const response = await axiosInstance.get(endpoint, {
        params:data
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        throw axiosError?.response?.data;
      } else {
        throw error;
      }
    }
  };

 export const postCall = async (endpoint:string, data :any ) => {
  const axiosInstance = useAxios()
    try {
      const response = await axiosInstance.post(endpoint, data);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        throw axiosError?.response?.data;
      } else {
        throw error;
      }
    }
  };

  export const putCall = async (endpoint:string, data :any ) => {
    const axiosInstance = useAxios()
    try {
      const response = await axiosInstance.put(endpoint, data);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        throw axiosError?.response?.data;
      } else {
        throw error;
      }
    }
  };

  export const deletecall = async (endpoint:string, data :any ) => {
    const axiosInstance = useAxios()
    try {
      const response = await axiosInstance.delete(endpoint, {
        data:{
          id:data.id
        },
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        throw axiosError?.response?.data;
      } else {
        throw error;
      }
    }
  };
export const patchCall = async (endpoint:string, data :any ) => {
  const axiosInstance = useAxios()
  try {
    const response = await axiosInstance.patch(endpoint, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      throw axiosError?.response?.data;
    } else {
      throw error;
    }
  }
};