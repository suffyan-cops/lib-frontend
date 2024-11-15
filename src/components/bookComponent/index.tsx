import ModalComponent from "../modal";
import AddBooks from "./addBooks";
import { useDispatch, useSelector } from "react-redux";
import Table from "../common/table";
import { useEffect, useState } from "react";
import { changeModalState } from "../../store/slices/modalSlice";
import EditBooks from "./editBook";
import { endPoints } from "../../services/constants/endPoints";
import { deletecall, getCall, postCall, putCall } from "../../services/crudServices";
import { toast } from "react-toastify";
import { getLocalStorageItem } from "../../services/localStorageItem";
const BookList = () => {
    const role= getLocalStorageItem("role");
    const dispatch = useDispatch();
    const [books, setBook] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [editBookRecord, setEditBookRecord] = useState(false);
    const [editBookData, setEditBookData] = useState({
        title: "",
        description: "",
        publication_year: "",
        quantity: "",
        library_id: ""
    });
    const [addBookData, setAddBookData] = useState({
        title: "",
        description: "",
        publication_year: "",
        quantity: "",
        library_id: ""
    });

    useEffect(() => {
        fetchBooks();
    }, [])
    const headers = [{ name: "Title", selector: "title" }, { name: "Description", selector: "description" }, { name: "Quantity", selector: "quantity" }, { name: "Publication Year", selector: "publication_year" }, { name: "Library Name", selector: "library_name" }, { name: "Actions", selector: "action" }];
    const modalValue = useSelector((state: any) => state.modal.isOPenModal);
    const fetchBooks = async () => {
        try {
            const response = await getCall(endPoints.fetchAllBooks);
            console.log(response)
            setBook(response);
        } catch (error) {
            console.error(error);
            toast.error(`${error?.response?.data?.error || "Failed to fetch Books"}`)
        }
    }

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {  
            try {
                const response = await getCall(endPoints.searchBookByTitle, {searchValue : searchValue});
                console.log(response,"filter")
                if(response?.length > 0)
                {
                    setBook(response);
                }
                else {
                    toast.info("No books found against this search");
                    setBook([]);
                }
            } catch (error) {
                console.error(error);
                toast.error(`${error?.response?.data?.error || "Failed to fetch filter books"}`)
            }
        }
    };

    const handleDeleteRecord = async (row) => {
        try {
            const result = await deletecall(endPoints.deleteBook, row);

            if (result.status === 200) {
                toast.success(`${result?.data?.message}`);
                fetchBooks();
            }
        } catch (error) {
            console.error(error);
            toast.error(`${error?.response?.data?.error || "Failed to delete library"}`)
        }
    }

    const handelEditRecord = (book) => {
        setEditBookData(book);
        dispatch(changeModalState(true))
        setEditBookRecord(true)
    }

    const saveEditRecord = async () => {
        if (!editBookData.title) {
            toast.error("Please enter a valid Name.");
            return;
        }
        try {
            const response = await putCall(endPoints.updateBook, editBookData);
            if (response.status === 200) {
                toast.success(`${response?.data?.message}`);
                setEditBookRecord(false)
                setEditBookData({
                    title: "",
                    description: "",
                    publication_year: "",
                    quantity: "",
                    library_id: ""
                })
                dispatch(changeModalState(false))
                fetchBooks();
            }
        } catch (error) {
            console.error(error);
            toast.error(`${error?.message + ' ( Name' + ' '+ error?.result?.title + ')'}`)
        }
    }

    const handleAddCancelModal = () => {
        setAddBookData({
            title: "",
            description: "",
            publication_year: "",
            quantity: "",
            library_id: ""
        })
        setEditBookData({
            title: "",
            description: "",
            publication_year: "",
            quantity: "",
            library_id: ""
        })
        dispatch(changeModalState(false))
        setEditBookRecord(false)
    }
    const handleAddRecord = async () => {
        if (!addBookData.title) {
            toast.error("Please enter a valid Name.");
            return;
        }
        const userData = JSON.parse(getLocalStorageItem("userData"));
        if(role==="librarian" && addBookData.library_id === "")
        {
                addBookData.library_id = userData?.library_id;
        }
        try {
            const result = await postCall(endPoints.addBook, addBookData);
            console.log(result, "Book added")
            if (result.status === 200) {
                toast.success(`${result?.data?.message}`);
                setAddBookData({
                    title: "",
                    description: "",
                    publication_year: "",
                    quantity: "",
                    library_id: ""
                })
                dispatch(changeModalState(false))
                fetchBooks();
            }
        } catch (error) {
            console.error(error);
            toast.error(`${error?.message + ' ( Name' + ' '+ error?.data?.title + ')'}`)
        }
    }

    const handleAddEditData = () => {

        if (editBookRecord) {
            saveEditRecord();
        } else {
            handleAddRecord();
        }
    }
    return (
        <>
            <div className="flex flex-col justify-center items-center  ">
                <Table data={books} header={headers} placeholder="Book Name" handleDeleteRecord={handleDeleteRecord} handelEditRecord={handelEditRecord} isRole={role} setSearchValue={setSearchValue} searchValue={searchValue} handleKeyPress={handleKeyPress} />
                {
                    modalValue &&
                    <ModalComponent
                        children={!editBookRecord ? <AddBooks setAddBookData={setAddBookData} addBookData={addBookData} /> : <EditBooks setEditBookData={setEditBookData} editBookData={editBookData} />}
                        onDelete={handleAddEditData}
                        onCancel={handleAddCancelModal}
                        btnText={!editBookRecord ? "Add Book" : "Edit Book"} />
                }
            </div>
        </>
    )
}

export default BookList;