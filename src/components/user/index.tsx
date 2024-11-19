import AddUser from "./addUser";
import ModalComponent from "../modal";
import { useDispatch, useSelector } from "react-redux";
import Table from "../common/table";
import { useEffect, useState } from "react";
import { changeModalState } from "../../store/slices/modalSlice";
import EditUser from "./editUser";
import { deletecall, getCall, postCall, putCall } from "../../services/crudServices";
import { endPoints } from "../../services/constants/endPoints";
import { toast } from "react-toastify";

const UserList = () => {

    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [editUserRecord, setEditUserRecord] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [editUserData, setEditUserData] = useState({
        name: "",
        email: "",
        role: 0,
        library_id: "",
        password: ""
    });
    const [addUserRecord, setAddUserRecord] = useState({
        name: "",
        email: "",
        role: 0,
        library_id: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        library_id: ""
    }); 

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await getCall(endPoints.getUsers);
            setUsers(response);
        } catch (error) {
            console.error(error);
            toast.error(`${error?.response?.data?.error || "Failed to fetch libraries"}`)
        }
    }

    const validateField = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let valid = true;
        const newErrors = { email: "", password: "", name: "", role:'', library_id:'' };

        if (!addUserRecord.email || !emailRegex.test(addUserRecord.email)) {
            newErrors.email = "Please enter a valid email address.";
            valid = false;
        }
        if (!addUserRecord.password || addUserRecord.password.length < 6) {
            newErrors.password = "Password must be at least 8 characters long.";
            valid = false;
        }

        if (!addUserRecord.name) {
            newErrors.name = "Please enter a valid name.";
            valid = false;
        }
        if (!addUserRecord.role ) {
            newErrors.role = "Role must be selected";
            valid = false;
        }
        if (!addUserRecord.library_id ) {
            newErrors.library_id = "Library must be selected";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };
    const validateFieldForEdit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let valid = true;
        const newErrors = { email: "", password: "", name: "", role:'', library_id:'' };

        if (!editUserData.email || !emailRegex.test(editUserData.email)) {
            newErrors.email = "Please enter a valid email address.";
            valid = false;
        }

        if (!editUserData.name) {
            newErrors.name = "Please enter a valid name.";
            valid = false;
        }
        if (!editUserData.role ) {
            newErrors.role = "Role must be selected";
            valid = false;
        }
        if (!editUserData.library_id ) {
            newErrors.library_id = "Library must be selected";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            try {
                const response = await getCall(endPoints.searchUserByName, {searchValue : searchValue});
                if(response?.length > 0)
                {
                    setUsers(response);
                }
                else {
                    toast.info("No Users found against this search");
                    setUsers([]);
                }
            } catch (error) {
                console.error(error);
                toast.error(`${error?.response?.data?.error || "Failed to fetch filter Users"}`)
            }
        }
    };
    const headers = [{ name: "Title", selector: "name" }, { name: "Email", selector: "email" }, { name: "Role", selector: "role" }, { name: "Library Name", selector: "library_name" }, { name: "Actions", selector: "action" }];
    const modalValue = useSelector((state: any) => state.modal.isOPenModal);
    const handleDeleteRecord = async (user) => {
        try {
            const result = await deletecall(endPoints.deleteUser, user);

            if (result.status === 200) {
                toast.success(`${result?.data?.message}`);
                fetchUsers();
            }
        } catch (error) {
            console.error(error);
            toast.error(`${error?.response?.data?.error || "Failed to delete User"}`)
        }
    }

    const handelEditRecord = (user) => {
        setEditUserData(user);
        dispatch(changeModalState(true))
        setEditUserRecord(true)
    }

    const saveEditRecord = async () => {
        if(!validateFieldForEdit())return
        const intRole = Number(editUserData.role_value);
        try {
            const response = await putCall(endPoints.updateUser, {
                user: {
                    id: editUserData.id,
                    name: editUserData.name,
                    email: editUserData.email,
                    role: intRole,
                    library_id: editUserData.library_id,
                    password: editUserData.password
                }
            });
            if (response.status === 200) {
                toast.success(`${response?.data?.message}`);
                setEditUserRecord(false)
                setEditUserData({
                    name: "",
                    email: "",
                    role: 0,
                    library_id: "",
                    password: ""
                })
                dispatch(changeModalState(false))
                fetchUsers();
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
        setAddUserRecord({
            name: "",
            email: "",
            role: 0,
            library_id: "",
            password: ""
        })
        setEditUserData({
            name: "",
            email: "",
            role: 0,
            library_id: "",
            password: ""
        })
        setEditUserRecord(false)
    }

    const handleAddRecord = async () => {
        if(!validateField())return
        const intRole = Number(addUserRecord.role);
        try {
            const result = await postCall(endPoints.addUser, {
                user: {
                    name: addUserRecord.name,
                    email: addUserRecord.email,
                    role: intRole,
                    library_id: addUserRecord.library_id,
                    password: addUserRecord.password
                }
            });
            if (result.status === 200) {
                toast.success(`${result?.data?.message}`);
                setAddUserRecord({
                    name: "",
                    email: "",
                    role: 0,
                    library_id: "",
                    password: ""
                })
                dispatch(changeModalState(false))
                fetchUsers();
            }
        } catch (error) {
            console.error(error);
            toast.error(`${error?.message + ' (' + ' ' + error?.error + ')'}`)
        }
    }

    const handleAddEditData = () => {
        if (editUserRecord) {
            saveEditRecord();
        } else {
            handleAddRecord();
        }
    }
    return (
        <>
            <div className="flex flex-col justify-center items-center  ">
                <Table data={users} header={headers} placeholder="User Name" handleDeleteRecord={handleDeleteRecord} handelEditRecord={handelEditRecord} setSearchValue={setSearchValue} searchValue={searchValue} handleKeyPress={handleKeyPress}/>

                {
                    modalValue &&
                    <ModalComponent
                        children={!editUserRecord ? <AddUser setAddUserRecord={setAddUserRecord} addUserRecord={addUserRecord} errors={errors}/> : <EditUser setEditUserData={setEditUserData} editUserData={editUserData} errors={errors}/>}
                        onDelete={handleAddEditData}
                        onCancel={handleAddCancelModal}
                        btnText={!editUserRecord ? "Add User" : "Edit User"} />
                }
            </div>
        </>
    )
}

export default UserList;