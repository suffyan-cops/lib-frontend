import { EditLibraryProps, EditLibraryTypes } from "./types";

const EditLibrary: React.FC<EditLibraryProps> = ({setEditLibraryData, editLibraryData , errors}) =>{
    const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditLibraryData((prevData :EditLibraryTypes) => ({
          ...prevData,
          [name]: value,
        }));
      };

    return (
        <>
           <h1 className="mb-10 text-center text-3xl font-bold text-primary"> Edit Library</h1>
            <div className="w-[400px]">
                <input type="text" placeholder="Enter name" name="name" value={editLibraryData.name || ""} onChange={(e)=>handleChange(e)} className="w-full p-2 !border !border-primary outline-none focus:!border-primary" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                <input type="text" placeholder="Enter phone_number" name="phone_number" value={editLibraryData.phone_number || ""} onChange={(e)=>handleChange(e)} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
                <input type="text" placeholder="Enter address" name="address" value={editLibraryData.address || ""} onChange={(e)=>handleChange(e)} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                <input type="text" placeholder="Enter email" name="email" value={editLibraryData.email || ""} onChange={(e)=>handleChange(e)} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                <input type="text" placeholder="Enter websites" name="website" value={editLibraryData.website || ""} onChange={(e)=>handleChange(e)} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
            </div>
        </>
    )
}

export default EditLibrary;
