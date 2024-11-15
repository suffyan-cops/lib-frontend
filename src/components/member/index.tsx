import AddMember from "./addMember";
import ModalComponent from "../modal";
import { useDispatch, useSelector } from "react-redux";
import Table from "../common/table";
import {  useEffect, useState } from "react";
import { changeModalState } from "../../store/slices/modalSlice";
import EditMember from "./editMember";
import { toast } from "react-toastify";
import { deletecall, getCall, postCall, putCall } from "../../services/crudServices";
import { endPoints } from "../../services/constants/endPoints";
import { getLocalStorageItem } from "../../services/localStorageItem";

const MemberList = () => {
    const role= getLocalStorageItem("role");
    const dispatch = useDispatch();
    const [members, setMembers] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [editMemberRecord, setEditMemberRecord] = useState(false);
    const [editMemberData, setEditMemberData] = useState({
        name:"",
        phone_number:"",
        address:"",
        email:"",
        number_of_books_issued:'',
        membership_start_date:"",
        library_id:""
    });
    const [addMemberData, setAddMemberData] = useState({
        name:"",
        phone_number:"",
        address:"",
        email:"",
        number_of_books_issued:'',
        membership_start_date:"",
        library_id:""
    });
    const headers = [{ name:"Name", selector:"name"}, {name:"Email" , selector:"email"}, {name:"Membership start Date" , selector:"membership_start_date" }, {name:"No Of Books Issue" , selector:"number_of_books_issued"},{name:"Library Name", selector:'library_name'}, {name: "Actions" , selector:"action"}];
    const modalValue = useSelector((state: any) => state.modal.isOPenModal);

    const handelEditRecord = (member) => {
        setEditMemberData(member);
        dispatch(changeModalState(true))
        setEditMemberRecord(true)
    }


    useEffect(() => {
        fetchMembers();
    }, [])

    const fetchMembers = async () => {
        try {
            const response = await getCall(endPoints.getMembers);
            setMembers(response);
        } catch (error) {
            console.error(error);
            toast.error(`${error?.response?.data?.error || "Failed to fetch Members"}`)
        }
    }


    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            try {
                const response = await getCall(endPoints.searchMemberByName, {searchValue : searchValue});
                if(response?.length > 0)
                {
                    setMembers(response);
                }
                else {
                    toast.info("No Member found against this search");
                    setMembers([]);
                }
            } catch (error) {
                console.error(error);
                toast.error(`${error?.response?.data?.error || "Failed to fetch filter Member"}`)
            }
        }
    };

    const saveEditRecord = async () => {
        if (!editMemberData.name) {
            toast.error("Please enter a valid Name.");
            return;
        }
        try {
            const response = await putCall(endPoints.updateMember,editMemberData );
            if (response.status === 200) {
                toast.success(`${response?.data?.message}`);
                setEditMemberRecord(false)
                setEditMemberData({
                    name:"",
                    phone_number:"",  
                    address:"",
                    email:"",
                    number_of_books_issued:'',
                    membership_start_date:"",
                    library_id:""
                })
                dispatch(changeModalState(false))
                fetchMembers();
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

    const handleDeleteRecord = async (member) => {
        try {
            const result = await deletecall(endPoints.deleteMember, member);

            if (result.status === 200) {
                toast.success(`${result?.data?.message}`);
                fetchMembers();
            }
        } catch (error) {
            console.error(error);
            toast.error(`${error?.response?.data?.error || "Failed to delete Member"}`)
        }
    }
    const handleAddCancelModal = () => {
        dispatch(changeModalState(false))
        setAddMemberData({
            name:"",
            phone_number:"",  
            number_of_books_issued:'',
            address:"",
            email:"",
            membership_start_date:"",
            library_id:""
        })
        setEditMemberData({
            name:"",
            phone_number:"",  
            number_of_books_issued:'',
            address:"",
            email:"",
            membership_start_date:"",
            library_id:""
        })
        setEditMemberRecord(false)
    }

    const handleAddRecord = async () => {
        if (!addMemberData.name) {
            toast.error("Please enter a valid Name.");
            return;
        }
        const userData = JSON.parse(getLocalStorageItem("userData"));
        if(role==="librarian" && addMemberData.library_id === "")
        {
            addMemberData.library_id = userData?.library_id;
        }
        try {
            const result = await postCall(endPoints.addMember,addMemberData);
            if (result.status === 200) {
                toast.success(`${result?.data?.message}`);
                setAddMemberData({
                    name:"",
                    phone_number:"",  
                    address:"",
                    number_of_books_issued:'',
                    email:"",
                    membership_start_date:"",
                    library_id:""
                })
                dispatch(changeModalState(false))
                fetchMembers()
            }
        } catch (error) {
            console.error(error);
            toast.error(`${error?.message + ' (' + ' ' + error?.error + ')'}`)
        }
    }


    const handleAddEditData = () => {
        if (editMemberRecord) {
            saveEditRecord();
        } else {
            handleAddRecord();
        }
    }
    return (
        <>
        <div className="flex flex-col justify-center items-center  ">
        <Table data={members} header={headers} placeholder="Member Name" handleDeleteRecord={handleDeleteRecord} handelEditRecord={handelEditRecord} isRole={role} setSearchValue={setSearchValue} searchValue={searchValue} handleKeyPress={handleKeyPress}/>

{
                    modalValue &&
                    <ModalComponent
                        children={!editMemberRecord ? <AddMember setAddMemberData={setAddMemberData} addMemberData={addMemberData} /> : <EditMember setEditMemberData={setEditMemberData} editMemberData={editMemberData} />}
                        onDelete={handleAddEditData}
                        onCancel={handleAddCancelModal}
                        btnText={!editMemberRecord ? "Add Member" : "Edit Member"} />
                }
        </div>
        </>
    )
}

export default MemberList;