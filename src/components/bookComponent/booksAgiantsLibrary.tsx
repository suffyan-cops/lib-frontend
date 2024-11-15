import { toast } from "react-toastify";
import { endPoints } from "../../services/constants/endPoints";
import { getCall } from "../../services/crudServices";
import { useEffect, useState } from "react";

const BooksAgainstLibrary = ({ library }) => {
    const [books, setBooks] = useState([]);
    useEffect(()=>{
        fetchBooksAgainstLib();
    },[])
    const fetchBooksAgainstLib = async () => {
        try {
            const response = await getCall(endPoints.getBooksAgainstLibrary, {library_id:library?.id});
            setBooks(response);
        } catch (error) {
            console.error(error);
            toast.error(`${error?.message}`)
        }
    }
    return (
        <table className="table-auto w-full border-collapse">
            <thead>
                <tr>
                    <th className="border border-primary p-2">Name</th>
                    <th className="border border-primary p-2">Year</th>
                    <th className="border border-primary p-2">Description</th>
                    <th className="border border-primary p-2">Quantity</th>
                    {/* Add more columns as needed */}
                </tr>
            </thead>
            <tbody>
                        {books?.map((book, index) => (
                    <tr key={`${index} + ${book?.title}`}>
                            <>
                            <td className="border border-primary p-2">{book.title ? book.title : "N/A"}</td>
                            <td className="border border-primary p-2">{book.publication_year ? book.publication_year : "N/A"}</td>
                            <td className="border border-primary p-2">{book.description ? book.description : "N/A"}</td>
                            <td className="border border-primary p-2">{book.quantity ? book.quantity : "N/A"}</td>
                            
                            
                            </>
                    </tr>
                        ))}
            </tbody>
        </table>
    );
};

export default BooksAgainstLibrary;
