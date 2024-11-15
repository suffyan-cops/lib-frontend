import { Link, useLocation } from "react-router-dom";
import ModalComponent from "../modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { endPoints } from "../../services/constants/endPoints";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/authSlice";
import { getLocalStorageItem, removeLocalStorageItem } from "../../services/localStorageItem";
import { baseUrl } from "../../services/constants/endPoints";


const SideBarItem = ({ item }: any) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [cookies, setCookie,removeCookie] = useCookies(['jwt']);
    const navigate = useNavigate();
    const [logoutUsers, setLogoutUser] = useState(false);
    const handleLogout = () => {
        setLogoutUser((prev) => !prev)
    }

    const confirmLogout = async () => {
        try{
            const response = await axios.delete(`${baseUrl}/${endPoints.logout}`, {
                headers: {
                  Authorization: `Bearer ${getLocalStorageItem("token")}`,
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              });
              if(response?.status ===200)
              { 
                removeCookie("jwt")
                toast.success(`${response.data.message}`)
                removeLocalStorageItem("userData")
                removeLocalStorageItem("role")
                removeLocalStorageItem("token")
                dispatch(logoutUser())
                setLogoutUser(false)
                navigate("/")
              }
        }catch(error){
            console.error(error)
            toast.error(`${error?.response?.data?.error || "Failed to logout"  }`)
        }
    }
    const isActive = location.pathname === item?.route;

    return (
        <>
            {item && (
                <li className={` p-3 mt-1 rounded-lg  font-bold text-xl text-[#F6D88F] hover:bg-[#AA7622] ${isActive ? "bg-[#AA7622]" : 'bg-none'} `}>
                    <span className={`flex items-center  `}>
                        {item.icon}
                        <Link to={item?.route}  className={`pt-2`}>
                            {item?.title === "Logout" ? <span className="ml-2" onClick={handleLogout}>{item?.title}</span> : item?.title}
                        </Link>
                    </span>
                </li>
            )}
            {logoutUsers && (

                <ModalComponent
                    children={<div className="text-md text-primary font-bold">Are you sure you want to Logout ?</div>}
                    onDelete={confirmLogout}
                    onCancel={handleLogout}
                    btnText="Logout" />
            )}
        </>
    )
}

export default SideBarItem;