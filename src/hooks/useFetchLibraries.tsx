import { toast } from "react-toastify";
import { endPoints } from "../services/constants/endPoints";
import { getCall } from "../services/crudServices";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";


interface ErrorResponse {
  error: string;
}


export const useFetchLibraries = () => {
    const [libraries, setLibraries] = useState([]);

    useEffect(() => {
      const fetchLibraries = async () => {
        try {
          const response = await getCall(endPoints.fetchAllLibraries);
          setLibraries(response);
        } catch (error) {
          const err = error as AxiosError<ErrorResponse>;
          const errorMessage =
            err?.response?.data?.error || "Failed to fetch libraries";
          toast.error(errorMessage);
        }
      };

      fetchLibraries();
    }, []);

    return { libraries };
  };