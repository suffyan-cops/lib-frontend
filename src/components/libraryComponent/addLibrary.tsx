import { AddLibraryProps, AddLibraryTypes } from "./types";

const AddLibrary : React.FC<AddLibraryProps> = ({setAddLibraryData , addLibraryData, errors})=>{

    const handleChange = (e :  React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddLibraryData((prevData : AddLibraryTypes) => ({
            ...prevData,
            [name]: value,
        }));
    };
    return (
        <>
           <h1 className="mb-10 text-center text-3xl font-bold text-primary"> Add Library</h1>
            <div className="w-[400px]">
                <input type="text" placeholder="Enter name" name="name" onChange={handleChange} value={addLibraryData.name} className="w-full p-2 !border !border-primary outline-none focus:!border-primary" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                <input type="text" placeholder="Enter phone_number" name="phone_number" onChange={handleChange} value={addLibraryData.phone_number} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
                <input type="text" placeholder="Enter address" name="address" onChange={handleChange} value={addLibraryData.address} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                <input type="text" placeholder="Enter email" name="email" onChange={handleChange} value={addLibraryData.email} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                <input type="text" placeholder="Enter websites" name="website" onChange={handleChange} value={addLibraryData.website} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
            </div>
        </>
    )
}

export default AddLibrary;