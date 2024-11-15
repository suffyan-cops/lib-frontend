import { useFetchLibraries } from "../../hooks/useFetchLibraries";
import { getLocalStorageItem } from "../../services/localStorageItem";
import { AddMemberProps } from "./types";

const AddMember : React.FC<AddMemberProps> = ({setAddMemberData, addMemberData}) =>{
    const role =getLocalStorageItem("role")
    const userData = JSON.parse(getLocalStorageItem("userData"));
    const {libraries} = useFetchLibraries();
    const handleChange = (e:  React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAddMemberData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    return (
        <>
           <h1 className="mb-10 text-center text-3xl font-bold text-primary"> Add Member</h1>
            <div>
                <input type="text" placeholder="Enter name" name="name" value={addMemberData.name || ""} onChange={(e)=>handleChange(e)} className="w-full p-2 !border !border-primary outline-none focus:!border-primary" />
                <input type="text" placeholder="Enter phone_number" name="phone_number" value={addMemberData.phone_number || ""} onChange={(e)=>handleChange(e)} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                <input type="text" placeholder="Enter address" name="address" value={addMemberData.address || ""} onChange={(e)=>handleChange(e)} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                <input type="text" placeholder="Enter email" name="email" value={addMemberData.email || ""} onChange={(e)=>handleChange(e)} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                <input type="date" placeholder="Select membership_start_date" name="membership_start_date" value={addMemberData.membership_start_date || ""} onChange={(e)=>handleChange(e)} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                <input type="number" placeholder="Select number_of_books_issued" name="number_of_books_issued" value={addMemberData.number_of_books_issued || ""} onChange={(e)=>handleChange(e)} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                <select name="library_id" value={userData?.library_id !='' ? userData?.library_id :null } onChange={handleChange} disabled={role==="librarian"} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" >
                    <option value="" selected disabled>Select a library</option>
                    {libraries?.map((library) => (
                        <option key={library?.id} value={library?.id} selected={ userData?.library_id !='' ?  library?.id === userData?.library_id :false}>
                            {library?.name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default AddMember;