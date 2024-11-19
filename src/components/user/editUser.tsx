import { useFetchLibraries } from "../../hooks/useFetchLibraries";
import { EditUserProps } from "./types";
import { Roles } from "./types";

const EditUser : React.FC<EditUserProps> = ({setEditUserData, editUserData, errors}) =>{
  const { libraries } = useFetchLibraries();
    const handleChange = (e :  React.ChangeEvent<HTMLInputElement> |  React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditUserData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    return (
        <>
           <h1 className="mb-10 text-center text-3xl font-bold text-primary"> Edit User</h1>
            <div className="w-[400px]">
                <input type="text" placeholder="Enter name" value={editUserData.name || ""} name="name" onChange={handleChange} className="w-full p-2 !border !border-primary outline-none focus:!border-primary" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                <input type="text" placeholder="Enter email" value={editUserData.email || ""} name="email" onChange={handleChange} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                {/* <input type="text" placeholder="Enter password" value={editUserData.password || ""} name="password" onChange={handleChange} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" /> */}
                <select name="role_value" value={editUserData.role_value || ""} onChange={handleChange} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" >
                    <option value="" selected disabled>Select Role</option>
                    {Roles?.map((role , index) => (
                        <option key={`${role?.id} + ${index}`} value={role?.id} >
                            {role?.name}
                        </option>
                    ))}
                </select>
                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                <select name="library_id" value={editUserData.library_id || ""} onChange={handleChange} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" >
                    <option value="" selected disabled>Select a library</option>
                    {libraries?.map((library) => (
                        <option key={library?.id} value={library?.id} selected={library?.id === editUserData.library_id}>
                            {library?.name}
                        </option>
                    ))}
                </select>
                {errors.library_id && <p className="text-red-500 text-sm mt-1">{errors.library_id}</p>}

            </div>
        </>
    )
}

export default EditUser;
