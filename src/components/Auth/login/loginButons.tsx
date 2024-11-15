import React from "react";
import { LoginButtonProps } from "./types";
import Loader from "../../common/loader";

const LoginButtons: React.FC<LoginButtonProps> = ({ loading, userLogin }) => {
    return (
        <>
            <div className="mt-10 w-full ">
                <button

                    className="rounded-3xl w-full bg-primary text-white flex justify-center  px-10 py-2 font-bold  shadow-submit duration-300  hover:text-white mr-2"
                    onClick={userLogin}
                    disabled={loading}
                >
                    Login {loading && (<Loader/>)}
                </button>

            </div>
        </>
    )
}

export default LoginButtons;