import { toast } from "react-toastify";
import { endPoints } from "../services/constants/endPoints";
import { getCall } from "../services/crudServices";
import { useEffect, useState } from "react";
import { getLocalStorageItem } from "../services/localStorageItem";
import { AxiosError } from "axios";

interface ErrorResponse {
  error: string;
}


export const useFetchCounts = () => {
  const role= getLocalStorageItem('role');
    const [bookCount, setBookCount] = useState(0);
    const [libraryCount, setLibraryCount] = useState(0);
    const [memberCount, setMemberCount] = useState(0);
    const [issuedBookCount, setIssuedBookCount] = useState(0);
    const [availableBookCount, setAvailableBookCount] = useState(0);
    const [libCount, setLibCount] = useState(0);

    useEffect(() => {
      const fetchBookCount = async () => {
        try {
          const response = await getCall(endPoints.fetchBookCount);
          setBookCount(response);
        } catch (error) {
          const err = error as AxiosError<ErrorResponse>;
          const errorMessage =
            err?.response?.data?.error || "Failed to fetch Book Count";
          toast.error(errorMessage);
        }
      };
      const fetchLibraryCount = async () => {
        try {
          const response = await getCall(endPoints.fetchLibraryCount);
          setLibraryCount(response);
        } catch (error) {
          const err = error as AxiosError<ErrorResponse>;
          const errorMessage =
            err?.response?.data?.error || "Failed to fetch Library Count";
          toast.error(errorMessage);
        }
      };

      const fetchMemberCount = async () => {
        try {
          const response = await getCall(endPoints.membersCount);
          setMemberCount(response);
        } catch (error) {
          const err = error as AxiosError<ErrorResponse>;
          const errorMessage =
            err?.response?.data?.error || "Failed to fetch Member Count";
          toast.error(errorMessage);
        }
      };

      const fetchIssuedBookCount = async () => {
        try {
          const response = await getCall(endPoints.issuedBookCount);
          setIssuedBookCount(response);
        } catch (error) {
          const err = error as AxiosError<ErrorResponse>;
          const errorMessage =
            err?.response?.data?.error || "Failed to fetch Member Count";
          toast.error(errorMessage);
        }
      };
      const fetchAvailableBookCount = async () => {
        try {
          const response = await getCall(endPoints.availableBooksCount);
          setAvailableBookCount(response);
        } catch (error) {
          const err = error as AxiosError<ErrorResponse>;
          const errorMessage =
            err?.response?.data?.error || "Failed to fetch AvailableBook Count";
          toast.error(errorMessage);
        }
      };

      const fetchLibCount = async () => {
        try {
          const response = await getCall(endPoints.libraryCount);
          setLibCount(response);
        } catch (error) {
          const err = error as AxiosError<ErrorResponse>;
          const errorMessage =
            err?.response?.data?.error || "Failed to fetch Library Count";
          toast.error(errorMessage);
        }
      };

      fetchBookCount();
      fetchLibraryCount();
      if(role!=='reader'){
        fetchMemberCount();
      }

      fetchIssuedBookCount();
      fetchAvailableBookCount();
      fetchLibCount();
    }, []);

    return { bookCount, libraryCount, memberCount,issuedBookCount, availableBookCount,libCount };
  };