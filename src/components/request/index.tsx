import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeModalState } from "../../store/slices/modalSlice";
import Table from "../common/table";
import ModalComponent from "../modal";
import AddRequest from "./addRequest";
import EditRequest from "./editRequest";
import { toast } from "react-toastify";
import { deletecall, getCall, postCall, putCall } from "../../services/crudServices";
import { endPoints, roles } from "../../services/constants/endPoints";
import { getLocalStorageItem } from "../../services/localStorageItem";

const RequestList = ()=>{
    const dispatch = useDispatch();
    const role =getLocalStorageItem('role')
    const [searchValue, setSearchValue] = useState('');
    const [editRequestRecord, setEditRequestRecord] = useState(false);
    const [requests, setRequest] =useState([]);
    const [editRequestData, setEditRequestData] = useState({
        book_id: "",
        user_id: "",
        status: "",
        return_date:""
    });
    const [addRequestRecord, setAddRequestRecord] = useState({
        book_id: "",
        user_id: "",
        status: "",
        return_date:""
    });
    const headers = [{ name:"Request Id", selector:"id"}, {name:"Book Name" , selector:"book_name"}, {name:"Reader Name" , selector:"user_name" }, {name:"Status" , selector:"status"},{name: "Actions" , selector:"action"}];
    const modalValue = useSelector((state: any) => state.modal.isOPenModal);

    useEffect(() => {
        fetchRequests();
    }, [])

    const fetchRequests = async () => {
        try {
            const response = await getCall(endPoints.getRequestList);
            setRequest(response);
        } catch (error) {
            console.error(error);
            toast.error(`${error?.response?.data?.error || "Failed to fetch requests"}`)
        }
    }

    const handleKeyPress = async (event) => {

        if (event.key === 'Enter') {  
            try {
                const response = await getCall(endPoints.searchRequestByStatus, {searchValue : searchValue});
                if(response?.length > 0)
                {
                    setRequest(response);
                }
                else {
                    toast.info("No request found against this search");
                    setRequest([]);
                }
           
            } catch (error) {
                console.error(error);
                toast.error(`${error?.error || "Failed to fetch filter request"}`)
            }
        }
    };

    const handleDeleteRecord = async (request) => {
        try {
            const result = await deletecall(endPoints.deleteRequest, request);

            if (result.status === 200) {
                toast.success(`${result?.data?.message}`);
                   fetchRequests();
            }
        } catch (error) {
            console.error(error);
            toast.error(`${error?.response?.data?.error || "Failed to delete Request"}`)
        }
    }

    const handelEditRecord = (request) => {
        setEditRequestData(request);
        dispatch(changeModalState(true))
        setEditRequestRecord(true)
    }

    const saveEditRecord = async () => {
        try {
            const response = await putCall(endPoints.updateRequest, editRequestData);
            if (response.status === 200) {
                toast.success(`${response?.data?.message}`);
                setEditRequestRecord(false)
                setEditRequestData({
                    book_id: "",
                    user_id: "",
                    status: "",
                    return_date:""
                })
                dispatch(changeModalState(false))
                fetchRequests();
            }
        } catch (error) {
            console.error(error);
            if (error?.result?.email) {
                toast.error(`${'( Email' + ' ' + error?.result?.email + ')'}`)
            }
            if (error?.result?.name) {
                toast.error(`${'( Name' + ' ' + error?.result?.name + ')'}`)
            }
            else {
                toast.error(`${error?.message}`)
            }

        }
    }


    const handleAddCancelModal = () => {
        dispatch(changeModalState(false))
        setAddRequestRecord({
            book_id: "",
            user_id: "",
            status: "",
            return_date:""
        })
        setEditRequestData({
            book_id: "",
            user_id: "",
            status: "",
            return_date:""
        })
        setEditRequestRecord(false)
    }

    const handleAddRecord = async () => {
        const userData = JSON.parse(getLocalStorageItem("userData"));
        if(role==="reader" && addRequestRecord.user_id === "")
        {
            addRequestRecord.user_id = userData?.id;
        }
            if (!addRequestRecord) {
                toast.error("All fields are required");
                return;
            }
        try {
            const result = await postCall(endPoints.addRequest,addRequestRecord);
            if (result.status === 200) {
                toast.success(`${result?.data?.message}`);
                setAddRequestRecord({
                    book_id: "",
                    user_id: "",
                    status: "",
                    return_date:""
                })
                dispatch(changeModalState(false))
                fetchRequests();
            }
        } catch (error) {
            console.error(error);
            toast.error(`${error?.message + ' (' + ' ' + error?.data?.book + ')'}`)
        }
    }

    const handleAddEditData = () => {
        if (editRequestRecord) {
            saveEditRecord();
        } else {
            handleAddRecord();
        }
    }
    return (
        <>
        <div className="flex flex-col justify-center items-center  ">
        <Table data={requests} header={headers} placeholder="Search By Status" handleDeleteRecord={handleDeleteRecord} handelEditRecord={handelEditRecord}  setSearchValue={setSearchValue} searchValue={searchValue} handleKeyPress={handleKeyPress} />

            {
                modalValue &&
                <ModalComponent
                    children={ !editRequestRecord ? <AddRequest setAddRequestRecord={setAddRequestRecord}  addRequestRecord={addRequestRecord} /> : <EditRequest setEditRequestData={setEditRequestData} editRequestData={editRequestData} />}
                    onDelete={handleAddEditData}
                    onCancel={handleAddCancelModal}
                    btnText={!editRequestRecord ? "Add Request" : "Edit Request"}/>
            }
        </div>
        </>
    )
}


export default RequestList;