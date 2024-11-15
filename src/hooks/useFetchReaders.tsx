import { toast } from "react-toastify";
import { endPoints } from "../services/constants/endPoints";
import { getCall } from "../services/crudServices";
import { useEffect, useState } from "react";




export const useFetchReaders = () => {
    const [readers, setReaders] = useState([]);

    useEffect(() => {
      const fetchLibraries = async () => {
        try {
          const response = await getCall(endPoints.getReadersList);
          setReaders(response);
        } catch (err) {
          toast.error(`${err?.response?.data?.error || "Failed to fetch Readers"}`);
        }
      };

      fetchLibraries();
    }, []);

    return { readers };
  };