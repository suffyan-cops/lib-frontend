import { AddRequestProps, AddRequestPropsData } from "./types";
import { useFetchReaders } from "../../hooks/useFetchReaders";
import { getCall } from "../../services/crudServices";
import { endPoints } from "../../services/constants/endPoints";
import {  useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getLocalStorageItem } from "../../services/localStorageItem";

const statuses = [{id:1 ,title:'Completed'}, {id:2, title:'Submitted'}, { id:3, title: 'Rejected'}]

const AddRequest : React.FC<AddRequestProps> = ({setAddRequestRecord,addRequestRecord}) => {
    const role =getLocalStorageItem("role")
    const userData = JSON.parse(getLocalStorageItem("userData"));
    const [books, setBooks] = useState([])
    const {readers} =useFetchReaders();

    const handleChange = (e :  React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if(name === "user_id") {
            setBooks([])
            console.log(value,"valuevalue")
            fetchBookAgainstReader(value)
        }
        setAddRequestRecord((prevData : AddRequestPropsData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    useEffect(()=>{
        if(role==="reader" && userData?.id!=null){
            fetchBookAgainstReader(userData?.id)
        }
    },[])

    const fetchBookAgainstReader = async (readerId : number | string) => {
        try {
            const response = await getCall(endPoints?.getBooksAgainstUserLibrary, {id :readerId});
                console.log(response,"response book after user selected")
                if(response?.length ==0){
                    toast.info("No books found against this reader");
                    return
                }
                setBooks(response)
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch books against user book");
        }
    }
    return (
        <>
        {/* // THsis is uncontrollerd component becasue it cab not handle by formData. This is a simple form example */}
            <h1 className="mb-10 text-center text-3xl font-bold text-primary"> Add Request</h1>
            <div>
                <select name="user_id" value={userData?.id !='' && role==='reader' ? userData?.id :null }  onChange={handleChange} disabled={role==="reader"}  className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" >
                    <option value="" selected disabled>Select  Reader</option>
                    {readers?.map((reader) => (
                        <option key={reader?.id} value={reader?.id} >
                            {reader?.name}
                        </option>
                    ))}
                </select>
                <select name="book_id" value={addRequestRecord.book_id}   onChange={handleChange}  className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-10" >
                    <option value="" selected disabled>Select Book</option>
                    { books?.length >0 ? books?.map((book) => (
                        <option key={book?.id} value={book?.id} >
                            {book?.title}
                        </option>
                    )) : <option value="" selected disabled>No Book Found</option>}
                </select>
                <input name="returned_date" value={addRequestRecord.returned_date}  type="date" onChange={handleChange} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-10"/>
                <select name="status" value={addRequestRecord.status}   onChange={handleChange}  className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-10" >
                    <option value="" selected disabled>Select Status</option>
                    { statuses?.length >0 ? statuses?.map((status) => (
                        <option key={status?.id} value={status?.title} >
                            {status?.title}
                        </option>
                    )) : <option value="" selected disabled>No Book Found</option>}
                </select>
            </div>
        </>
    )
}

export default AddRequest;