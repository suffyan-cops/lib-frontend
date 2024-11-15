import { AddUserProps, AddUserPropsData } from "./types";
import { useFetchLibraries } from "../../hooks/useFetchLibraries";
import { Roles } from "./types";

const AddUser: React.FC<AddUserProps> = ({ setAddUserRecord, addUserRecord }) => {
    const { libraries } = useFetchLibraries();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAddUserRecord((prevData: AddUserPropsData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    return (
        <>
            {/* // THsis is uncontrollerd component becasue it cab not handle by formData. This is a simple form example */}
            <h1 className="mb-10 text-center text-3xl font-bold text-primary"> Add User</h1>
            <div>
                <input type="text" placeholder="Enter name" value={addUserRecord.name || ""} name="name" onChange={handleChange} className="w-full p-2 !border !border-primary outline-none focus:!border-primary" />
                <input type="text" placeholder="Enter email" value={addUserRecord.email || ""} name="email" onChange={handleChange} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                <input type="text" placeholder="Enter password" value={addUserRecord.password || ""} name="password" onChange={handleChange} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                <select name="role" value={addUserRecord.role || ""} onChange={handleChange} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" >
                    <option value="" selected disabled>Select Role</option>
                    {Roles?.map((role , index) => (
                        <option key={`${role?.id} + ${index}`} value={role?.id} selected={role?.id === +addUserRecord.role}>
                            {role?.name}
                        </option>
                    ))}
                </select>
                <select name="library_id" value={addUserRecord.library_id || ""} onChange={handleChange} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" >
                    <option value="" selected disabled>Select a library</option>
                    {libraries?.map((library) => (
                        <option key={library?.id} value={library?.id} selected={library?.id === addUserRecord.library_id}>
                            {library?.name}
                        </option>
                    ))}
                </select>

            </div>
        </>
    )
}

export default AddUser;