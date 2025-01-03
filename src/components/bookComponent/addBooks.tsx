import { AddBookProps, AddBooksTypes } from "./types";
import { useFetchLibraries } from "../../hooks/useFetchLibraries";
import { getLocalStorageItem } from "../../services/localStorageItem";

const AddBooks: React.FC<AddBookProps> = ({ setAddBookData, addBookData, errors }) => {
    const role =getLocalStorageItem("role")
    const userData = JSON.parse(getLocalStorageItem("userData"));
    const {libraries} = useFetchLibraries();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAddBookData((prevData: AddBooksTypes) => ({
            ...prevData,
            [name]: value,
        }));
    };
    return (
        <>
            <h1 className="mb-10 text-center text-3xl font-bold text-primary"> Add Books</h1>
            <div className="w-[400px]">
                <input type="text" placeholder="Enter book title" value={addBookData.title} name="title" onChange={handleChange} className="w-full p-2 !border !border-primary outline-none focus:!border-primary" />
                {errors?.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                <input type="text" placeholder="Enter book description" value={addBookData.description} name="description" onChange={handleChange} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                {errors?.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                <input type="text" placeholder="Enter book publication year" value={addBookData.publication_year} name="publication_year" onChange={handleChange} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                {errors?.publication_year && <p className="text-red-500 text-sm mt-1">{errors.publication_year}</p>}
                <input type="number" placeholder="Enter book quantity" value={addBookData.quantity} name="quantity" onChange={handleChange} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                {errors?.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                <select name="library_id"  onChange={handleChange} value={userData?.library_id !='' ? userData?.library_id :null } disabled={role==="librarian"}  className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" >
                    <option value="" selected disabled>Select a library</option>
                    {libraries?.map((library) => (
                        <option key={library?.id} value={library?.id} selected={ userData?.library_id !='' ?  library?.id === userData?.library_id :false}>
                            {library?.name}
                        </option>
                    ))}
                </select>
                {errors?.library_id && <p className="text-red-500 text-sm mt-1">{errors.library_id}</p>}
            </div>
        </>
    )
}

export default AddBooks;