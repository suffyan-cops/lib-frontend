import { useFetchLibraries } from "../../hooks/useFetchLibraries";
import { getLocalStorageItem } from "../../services/localStorageItem";
import { EditMemberProps } from "./types";

const EditMember : React.FC<EditMemberProps> = ({setEditMemberData, editMemberData}) =>{
    const role =getLocalStorageItem("role")
    const { libraries } = useFetchLibraries();
    const handleChange = (e:  React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditMemberData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    return (
        <>
           <h1 className="mb-10 text-center text-3xl font-bold text-primary"> Edit Member</h1>
            <div>
                <input type="text" placeholder="Enter name" name="name" value={editMemberData.name || ""} onChange={(e)=>handleChange(e)} className="w-full p-2 !border !border-primary outline-none focus:!border-primary" />
                <input type="text" placeholder="Enter phone_number" name="phone_number" value={editMemberData.phone_number || ""} onChange={(e)=>handleChange(e)} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                <input type="text" placeholder="Enter address" name="address" value={editMemberData.address || ""} onChange={(e)=>handleChange(e)} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                <input type="text" placeholder="Enter email" name="email" value={editMemberData.email || ""} onChange={(e)=>handleChange(e)} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                <input type="number" placeholder="Select number_of_books_issued" name="number_of_books_issued" value={editMemberData.number_of_books_issued || ""} onChange={(e)=>handleChange(e)} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />

                <input type="date" placeholder="Select membership_start_date" name="membership_start_date" value={editMemberData.membership_start_date || ""} onChange={(e)=>handleChange(e)} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                <select name="library_id" value={editMemberData.library_id || ""}  disabled={role==="librarian"} onChange={handleChange} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" >
                    <option value="" selected disabled>Select a library</option>
                    {libraries?.map((library) => (
                        <option key={library?.id} value={library?.id} selected={library?.id === editMemberData.library_id}>
                            {library?.name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default EditMember;
