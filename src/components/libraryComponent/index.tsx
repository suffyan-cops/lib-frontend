import AddLibrary from "./addLibrary";
import ModalComponent from "../modal";
import Table from "../common/table";
import EditLibrary from "./editLibrary";

import { useEffect, useState } from "react";
import { changeModalState } from "../../store/slices/modalSlice";
import { deletecall, getCall, postCall, putCall } from "../../services/crudServices";
import { endPoints } from "../../services/constants/endPoints";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { headers } from "./types";

const LibraryList = () => {

    const dispatch = useDispatch();
    const [libraries, setLibraries] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [editLibraryRecord, setEditLibraryRecord] = useState(false);
    const [editLibraryData, setEditLibraryData] = useState({
        name: "",
        phone_number: "",
        address: "",
        email: "",
        website: ""
    });

    const [addLibraryData, setAddLibraryData] = useState({
        name: "",
        phone_number: "",
        address: "",
        email: "",
        website: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        phone_number: "",
        address: "",
        email: "",
        website: ""
    }); 
    const modalValue = useSelector((state: any) => state.modal.isOPenModal);

    useEffect(() => {
        fetchLibraries();
    }, [])

    const fetchLibraries = async () => {
        try {
            const response = await getCall(endPoints.fetchAllLibraries);
            setLibraries(response);
        } catch (error) {
            console.error(error);
            toast.error(`${error?.response?.data?.error || "Failed to fetch libraries"}`)
        }
    }

    const validateField = () => {
        let valid = true;
        const newErrors = {  name: "",
            phone_number: "",
            address: "",
            email: "",
            website: "" };
        if(!editLibraryRecord){
            if (!addLibraryData.name ) {
                newErrors.name = "Please enter a valid name .";
                valid = false;
            }
    
            if (!addLibraryData.phone_number) {
                newErrors.phone_number = "Phone Must be filled.";
                valid = false;
            }
            if (!addLibraryData.address ) {
                newErrors.address = "Address Must be filled";
                valid = false;
            }
            if (!addLibraryData.email ) {
                newErrors.email = "Email Must be filled";
                valid = false;
            }
            if (!addLibraryData.website ) {
                newErrors.website = "Website must be filled";
                valid = false;
            }
        }
        else{
            if (!editLibraryData.name ) {
                newErrors.name = "Please enter a valid name .";
                valid = false;
            }
    
            if (!editLibraryData.phone_number) {
                newErrors.phone_number = "Phone Must be filled.";
                valid = false;
            }
            if (!editLibraryData.address ) {
                newErrors.address = "Address Must be filled";
                valid = false;
            }
            if (!editLibraryData.email ) {
                newErrors.email = "Email Must be filled";
                valid = false;
            }
            if (!editLibraryData.website ) {
                newErrors.website = "Website must be filled";
                valid = false;
            }
        }
    

        setErrors(newErrors);
        return valid;
    };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {  
            try {
                const response = await getCall(endPoints.searchValueLibrary, {searchValue : searchValue});
                if(response?.length > 0)
                {
                    setLibraries(response);
                }
                else {
                    toast.info("No libraries found against this search");
                    setLibraries([]);
                }
           
            } catch (error) {
                console.error(error);
                toast.error(`${error?.response?.data?.error || "Failed to fetch filter libraries"}`)
            }
        }
    };

    const handleDeleteRecord = async (row: any) => {
        try {
            const result = await deletecall(endPoints.deleteLibrary, row);
            if (result.status === 200) {
                toast.success(`${result?.data?.message}`);
                fetchLibraries();
            }
        } catch (error) {
            console.error(error);
            toast.error(`${error?.response?.data?.error || "Failed to delete library"}`)
        }
    }

    const handelEditRecord = (library) => {
        dispatch(changeModalState(true))
        setEditLibraryData(library);
        setEditLibraryRecord(true)
    }
    const handleAddCancelModal = () => {
        setAddLibraryData({
            name: "",
            phone_number: "",
            address: "",
            email: "",
            website: ""
        })
        setEditLibraryData({
            name: "",
            phone_number: "",
            address: "",
            email: "",
            website: ""
        })
        setErrors({
            name: "",
            phone_number: "",
            address: "",
            email: "",
            website: ""
        })
        dispatch(changeModalState(false))
        setEditLibraryRecord(false)
    }

    const handleAddEditData = async () =>{
        
        if(editLibraryRecord) {
            if (!validateField())return;
            try {
                const response = await putCall(endPoints.updateLibrary, editLibraryData);
                if (response.status === 200) {
                    toast.success(`${response?.data?.message}`);
                    setEditLibraryRecord(false)
                    dispatch(changeModalState(false))
                    fetchLibraries();

                }
            } catch (error) {
                console.error(error);
                toast.error(`${error?.message + ' ( Name' + error?.data?.name + ')'}`)
            }
        }
        else {
            try {
                if (!validateField())return;
                const response = await postCall(endPoints.addLibrary, addLibraryData);
                if (response.status === 200) {
                    toast.success(`${response?.data?.message}`);
                    setAddLibraryData({
                        name: "",
                        phone_number: "",
                        address: "",
                        email: "",
                        website: ""
                    })
                    fetchLibraries();
                    dispatch(changeModalState(false))
                }
            } catch (error) {
                console.error(error);
                toast.error(`${error?.message + ' ( Name ' + error?.data?.name + ')'}`)
            }
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center  ">
                <div className="">
                    <Table data={libraries} header={headers} placeholder="Library Name" handleDeleteRecord={handleDeleteRecord} handelEditRecord={handelEditRecord} setSearchValue={setSearchValue} searchValue={searchValue} handleKeyPress={handleKeyPress} indexName='library' />
                </div>
                {
                    modalValue &&
                    <ModalComponent
                        children={ !editLibraryRecord ? <AddLibrary setAddLibraryData={setAddLibraryData} addLibraryData={addLibraryData} errors={errors} /> : <EditLibrary setEditLibraryData={setEditLibraryData} editLibraryData={editLibraryData} errors={errors} />}
                        onDelete={handleAddEditData}
                        onCancel={handleAddCancelModal}
                        btnText= { !editLibraryRecord ? "Add Library"  :"Edit Library"}/>
                }
            </div>
        </>
    )
}

export default LibraryList;