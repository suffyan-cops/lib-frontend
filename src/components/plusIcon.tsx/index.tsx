import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { changeModalState } from "../../store/slices/modalSlice";

const PlusIcon =()=>{
    const dispatch = useDispatch();
    return (
        <>
              <div className="bg-primary w-16 h-16 rounded-2xl absolute right-5 bottom-5 cursor-pointer flex justify-center items-center hover:hover:scale-110 transition-transform" onClick={()=> dispatch(changeModalState(false))}>
                    <FaPlus className="text-secondary" size={40}/>
                </div>
        </>
    )
}

export default PlusIcon;