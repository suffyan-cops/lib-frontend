import SideBarItem from "./sideBarItem";
import { FaHome, FaBook, FaUserFriends, FaRegHandshake, FaUser, FaSignOutAlt } from "react-icons/fa";
import { getLocalStorageItem } from "../../services/localStorageItem";
import { itemProp } from "./types";
const menuItem = [
    {
        title: "Home",
        route: '/dashboard',
        icon :  <FaHome className="mr-1"/>,
        roles : ["super_admin", "reader", "librarian"]
    },
    {
        title: "Users",
        route: '/user',
        icon :  <FaUser className="mr-1"/>,
        roles : ["super_admin"]
    },
    {
        title: "Books",
        route: '/book',
        icon :  <FaBook className="mr-1"/>,
        roles : ["super_admin", "reader", "librarian"]
    },
    {
        title: "Library",
        route: '/library',
        icon :  <FaBook className="mr-1"/>,
        roles : ["super_admin"]
    },
    {
        title: "Request",
        route: '/request',
        icon :  <FaRegHandshake className="mr-1"/>,
        roles : ["super_admin", "reader", "librarian"]
    },
    {
        title: "Members",
        route: '/member',
        icon :  <FaUserFriends className="mr-1"/>,
        roles : ["super_admin", "librarian"]
    },
    {
        title: "Logout",
        route:'',
        icon :  <FaSignOutAlt className="mr-1"/>,
        roles : ["super_admin", "reader", "librarian"]
    }
]

const SideBar = () =>{
    const userData = JSON.parse(getLocalStorageItem("userData"));
    const filteredMenuItems = menuItem.filter((item) => {
        const role =getLocalStorageItem("role");
        if (item.roles && item.roles.includes(role)) {
          return true;
        }
        return false;
      });
    return (
        <>
            <div className="m-1 mt-20">
                <h1 className="mx-6 rounded-2xl p-3  font-bold text-xl text-white ">{userData?.name.toUpperCase()}</h1>
                {filteredMenuItems.map((item: itemProp, index:number) => (
                    <nav key={index}>
                        <ul className="px-6 ">
                          <SideBarItem item={item}/>
                        </ul>
                    </nav>
                ))}
            </div>
        </>
    )
}


export default SideBar;