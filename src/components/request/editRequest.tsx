import { useEffect, useState } from "react";
import { EditRequestProps } from "./types";
import { useFetchReaders } from "../../hooks/useFetchReaders";
import { getCall } from "../../services/crudServices";
import { endPoints } from "../../services/constants/endPoints";
import { toast } from "react-toastify";
import { getLocalStorageItem } from "../../services/localStorageItem";
const statuses = [{id:1 ,title:'Completed'}, {id:2, title:'Submitted'}, { id:3, title: 'Rejected'}]
const EditRequest: React.FC<EditRequestProps> = ({ setEditRequestData, editRequestData ,errors}) => {
    const role =getLocalStorageItem("role")
    const [books, setBooks] = useState([])
    const {readers} =useFetchReaders();
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        if(name === "user_id") {
            setBooks([])
            fetchBookAgainstReader(value)
        }
        setEditRequestData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(()=>{
        if(editRequestData?.user_id){
            setBooks([])
            fetchBookAgainstReader(editRequestData?.user_id)
        }
    },[])

    const fetchBookAgainstReader = async (readerId : number | string) => {
        try {
            const response = await getCall(endPoints?.getBooksAgainstUserLibrary, {id :readerId});
                if(response?.length ==0){
                    toast.info("No books found against this reader");
                    if(editRequestData.book_id ){
                        console.log(editRequestData.book_id ,"editRequestData.book_id = ")
                        // setEditRequestData({book_id :'', user_id:editRequestData.user_id, returned_date:editRequestData.returned_date, status:editRequestData.status})
                    }
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
            <h1 className="mb-10 text-center text-3xl font-bold text-primary"> Edit Request</h1>
            <div className="w-[400px]">
                <select name="user_id" value={editRequestData.user_id} disabled={role==="reader"}  onChange={handleChange}  className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" >
                    <option value="" selected disabled>Select  Reader</option>
                    {readers?.map((reader) => (
                        <option key={reader?.id} value={reader?.id} >
                            {reader?.name}
                        </option>
                    ))}
                </select>
                {errors.user_id && <p className="text-red-500 text-sm mt-1">{errors.user_id}</p>}
                <select name="book_id" value={editRequestData.book_id}  onChange={handleChange}  className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-10" >
                    <option value="" selected disabled>Select Book</option>
                    { books?.length >0 ? books?.map((book) => (
                        <option key={book?.id} value={book?.id} >
                            {book?.title}
                        </option>
                    )) : <option value="" selected>No Book Found</option>}
                </select>
                {errors.book_id && <p className="text-red-500 text-sm mt-1">{errors.book_id}</p>}
                <input name="returned_date" value={editRequestData.returned_date}  type="date" onChange={handleChange} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-10"/>
                {errors.returned_date && <p className="text-red-500 text-sm mt-1">{errors.returned_date}</p>}
                <select name="status" value={editRequestData.status}   onChange={handleChange}  className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-10" >
                    <option value="" selected disabled>Select Status</option>
                    { statuses?.map((status) => (
                        <option key={status?.id} value={status?.title} >
                            {status?.title}
                        </option>
                    ))}
                </select>
                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
            </div>
        </>
    )
}

export default EditRequest;
