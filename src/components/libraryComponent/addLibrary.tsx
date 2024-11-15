import { AddLibraryProps, AddLibraryTypes } from "./types";

const AddLibrary : React.FC<AddLibraryProps> = ({setAddLibraryData , addLibraryData})=>{

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
            <div>
                <input type="text" placeholder="Enter name" name="name" onChange={handleChange} value={addLibraryData.name} className="w-full p-2 !border !border-primary outline-none focus:!border-primary" />
                <input type="text" placeholder="Enter phone_number" name="phone_number" onChange={handleChange} value={addLibraryData.phone_number} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                <input type="text" placeholder="Enter address" name="address" onChange={handleChange} value={addLibraryData.address} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                <input type="text" placeholder="Enter email" name="email" onChange={handleChange} value={addLibraryData.email} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
                <input type="text" placeholder="Enter websites" name="website" onChange={handleChange} value={addLibraryData.website} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mt-4" />
            </div>
        </>
    )
}

export default AddLibrary;