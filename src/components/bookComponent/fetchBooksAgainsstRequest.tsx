import { useEffect, useState } from "react";
import { getCall } from "../../services/crudServices";
import { endPoints } from "../../services/constants/endPoints";
import { toast } from "react-toastify";
import {formattedDate} from "../../utility/dateFormating";

const FetchBooksWithReturnDate =({book})=>{

    const [books, setBooks] = useState([]);
    useEffect(()=>{
        fetchBooksAgainstLib();
    },[])
    const fetchBooksAgainstLib = async () => {
        try {
            const response = await getCall(endPoints.fetchBooksWithReturnDate, {book_id:book?.id});
            setBooks(response);
        } catch (error) {s
            console.error(error);
            toast.error(`${error?.message}`)
        }
    }
    return  (
        <>
        <table className="table-auto w-full border-collapse">
            <thead>
                <tr>
                    <th className="border border-primary p-2">Reader Name</th>
                    <th className="border border-primary p-2">Requested Date</th>
                    <th className="border border-primary p-2">Due Date</th>
                    {/* Add more columns as needed */}
                </tr>
            </thead>
            <tbody>
                        {books?.map((book, index) => (
                    <tr key={`${index} + ${book?.book_title}`}>
                            <>
                            <td className="border border-primary p-2">{book.user_name ? book.user_name : "N/A"}</td>
                            <td className="border border-primary p-2">{book.updated_at ? formattedDate(book.updated_at) : "N/A"}</td>
                            <td className="border border-primary p-2">{book.returned_date ? formattedDate(book.returned_date ): "N/A"}</td>
                            
                            
                            </>
                    </tr>
                        ))}
            </tbody>
        </table>
        </>
    )
}


export default FetchBooksWithReturnDate;