import { toast } from "react-toastify";
import { endPoints } from "../services/constants/endPoints";
import { getCall } from "../services/crudServices";
import { useEffect, useState } from "react";




export const useFetchLibraries = () => {
    const [libraries, setLibraries] = useState([]);

    useEffect(() => {
      const fetchLibraries = async () => {
        try {
          const response = await getCall(endPoints.fetchAllLibraries);
          setLibraries(response);
        } catch (err) {
          toast.error(`${err?.response?.data?.error || "Failed to fetch libraries"}`);
        }
      };

      fetchLibraries();
    }, []);

    return { libraries };
  };