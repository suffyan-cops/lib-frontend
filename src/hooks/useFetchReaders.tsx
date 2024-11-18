import { toast } from "react-toastify";
import { endPoints } from "../services/constants/endPoints";
import { getCall } from "../services/crudServices";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

interface ErrorResponse {
  error: string;
}

export const useFetchReaders = () => {
    const [readers, setReaders] = useState([]);

    useEffect(() => {
      const fetchLibraries = async () => {
        try {
          const response = await getCall(endPoints.getReadersList);
          setReaders(response);
        } catch (error) {
          const err = error as AxiosError<ErrorResponse>;
          const errorMessage =
            err?.response?.data?.error || "Failed to fetch Readers";
          toast.error(errorMessage);
        }
      };

      fetchLibraries();
    }, []);

    return { readers };
  };