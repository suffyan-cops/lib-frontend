// @ts-nocheck
import LoginButtons from "./loginButons"
import LoginTextFields from "./loginTextFields"
import { postCall } from "../../../services/crudServices"
import { endPoints } from "../../../services/constants/endPoints"
import React, { useEffect } from "react"
import { toast } from "react-toastify"
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginUser } from "../../../store/slices/authSlice"
import { getLocalStorageItem, setLocalStorageItem } from "../../../services/localStorageItem"

const LoginComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false)
    const [cookies, setCookie] = useCookies(['jwt']);
    const [credential, setCredential] = React.useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = React.useState({
        email: "",
        password: "",
        loginError: ""
    });
    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let valid = true;
        const newErrors = { email: "", password: "", loginError: "" };

        if (!credential.email || !emailRegex.test(credential.email)) {
            newErrors.email = "Please enter a valid email address.";
            valid = false;
        }
        if (!credential.password || credential.password.length < 6) {
            newErrors.password = "Password must be at least 8 characters long.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    useEffect(() => {
        if (cookies.jwt && getLocalStorageItem("userData") && getLocalStorageItem("role") && getLocalStorageItem("token")) {
            navigate("/dashboard")
        }
    }, [])

    const userLogin = async () => {
        if (!validateForm()) return;
        setLoading(true);
        try {
            const result = await postCall(endPoints.login, { user: credential })
            const token = result.headers['authorization']
            if (result?.status == 200) {
                const userData = {
                    ...result?.data?.data,
                    jwtToken: token.split('Bearer')[1]?.trim() || ''
                };
                setCookie('jwt', token);
                toast.success(`${result?.data?.message}`)
                dispatch(loginUser(userData))
                setLocalStorageItem("userData", JSON.stringify({ id: userData.id, name: userData.name, email: userData.email, library_id: userData.library_id || '' }))
                setLocalStorageItem("role", userData.role)
                setLocalStorageItem("token", userData.jwtToken)
                navigate("/dashboard")
                setLoading(false);
            }
        } catch (error) {
            console.error(error)
            setErrors({ ...errors, loginError: error?.response?.data?.error || "Login failed. Please try again." });
            toast.error(`${error?.error}`)
            setLoading(false);
        }
    }
    return (
        <>
            <div className="fixed z-50 flex items-center justify-center w-full h-full bg-opacity-50">
                <div className="w-[400px] h-[390px] mx-auto rounded bg-white px-6 py-10 shadow-three dark:bg-dark sm:p-[40px]">
                    <div>
                        <p className="text-2xl font-bold text-gray-600 mb-6">Sign In</p>
                    </div>
                    <LoginTextFields setCredential={setCredential} credential={credential} errors={errors} />
                    <LoginButtons userLogin={userLogin} loading={loading} />
                </div>
            </div>
        </>
    )
}

export default LoginComponent