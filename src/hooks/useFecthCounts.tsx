import { toast } from "react-toastify";
import { endPoints } from "../services/constants/endPoints";
import { getCall } from "../services/crudServices";
import { useEffect, useState } from "react";


export const useFetchCounts = () => {
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
        } catch (err) {
          toast.error(`${err?.response?.data?.error || "Failed to fetch Book Count"}`);
        }
      };
      const fetchLibraryCount = async () => {
        try {
          const response = await getCall(endPoints.fetchLibraryCount);
          setLibraryCount(response);
        } catch (err) {
          toast.error(`${err?.response?.data?.error || "Failed to fetch Library Count"}`);
        }
      };

      const fetchMemberCount = async () => {
        try {
          const response = await getCall(endPoints.membersCount);
          setMemberCount(response);
        } catch (err) {
          toast.error(`${err?.response?.data?.error || "Failed to fetch Member Count"}`);
        }
      };

      const fetchIssuedBookCount = async () => {
        try {
          const response = await getCall(endPoints.issuedBookCount);
          setIssuedBookCount(response);
        } catch (err) {
          toast.error(`${err?.response?.data?.error || "Failed to fetch Member Count"}`);
        }
      };
      const fetchAvailableBookCount = async () => {
        try {
          const response = await getCall(endPoints.availableBooksCount);
          setAvailableBookCount(response);
        } catch (err) {
          toast.error(`${err?.response?.data?.error || "Failed to fetch AvailableBook Count"}`);
        }
      };

      const fetchLibCount = async () => {
        try {
          const response = await getCall(endPoints.libraryCount);
          setLibCount(response);
        } catch (err) {
          toast.error(`${err?.response?.data?.error || "Failed to fetch AvailableBook Count"}`);
        }
      };

      fetchBookCount();
      fetchLibraryCount();
      fetchMemberCount();
      fetchIssuedBookCount();
      fetchAvailableBookCount();
      fetchLibCount();
    }, []);

    return { bookCount, libraryCount, memberCount,issuedBookCount, availableBookCount,libCount };
  };