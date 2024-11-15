import React, { useState } from "react"
import SideBar from "../components/sidebar"
import PlusIcon from "../components/plusIcon.tsx"
import { getLocalStorageItem } from "../services/localStorageItem/index.ts"

interface LayoutInterface {
    children: React.ReactNode,
    name:string
}

const Layout = (props: LayoutInterface) => {
    const role=getLocalStorageItem('role');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);


    return (
        <>
            <div className="flex">
                <div className={`relative top-0 left-0 h-screen bg-primary transition-all duration-300 ${sidebarOpen ? 'w-72' : ' w-0 opacity-0'} lg:w-72 lg:opacity-100`}>
                    <SideBar />
                </div>
                <div className="pt-10 w-full">
                    <button
                        className="lg:hidden absolute top-5 left-5"
                        onClick={toggleSidebar}
                    >
                        <span
                            className={`relative my-1.5 block h-0.5 w-[30px] bg-[#AA7622] transition-all duration-300${sidebarOpen ? " top-[7px] rotate-45" : " "
                                }`}
                        />
                        <span
                            className={`relative my-1.5 block h-0.5 w-[30px] bg-[#AA7622] transition-all duration-300 ${sidebarOpen ? "opacity-0 " : " "
                                }`}
                        />
                        <span
                            className={`relative my-1.5 block h-0.5 w-[30px] bg-[#AA7622] transition-all duration-300   ${sidebarOpen ? " top-[-8px] -rotate-45" : " "
                                }`}
                        />
                    </button>
                    <div className="relative flex flex-1 flex-col lg:ml-72.5 pt-10">
                        {props.children}
                    </div>
                </div>  
                {!(props.name === "dashboard" || (props.name === "book" && role === "reader")) && (
  <PlusIcon />
)}
              
            </div>
        </>
    )
}

export default Layout