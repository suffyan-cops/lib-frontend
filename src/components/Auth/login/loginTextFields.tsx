import { useState } from "react";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import { AddMemberProps } from "./types";

const LoginTextFields : React.FC<AddMemberProps> = ({setCredential,credential}) => {
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const handleToggle = () => {
        if (type==='password'){
           setIcon(eye);
           setType('text')
        } else {
           setIcon(eyeOff)
           setType('password')
        }
     }
     const handleChange = (e :  React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredential((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    return (
        <>
            <div>
                <label className="text-sm  font-medium text-gray-500 ">Email Address</label>
                <input type="text" name="email" placeholder="Enter Email" value={credential.email} onChange={handleChange} className="w-full p-2 !border !border-primary outline-none focus:!border-primary mb-5" />
                <label className="text-sm  font-medium text-gray-500 ">Password</label>
                <div className=" flex ">
                    <input type={type} placeholder="Enter Password" name="password" value={credential.password} onChange={handleChange}  className="w-full p-2 !border !border-primary outline-none focus:!border-primary " />
                    <span className="flex justify-end cursor-pointer" onClick={handleToggle}>
                        <Icon className="absolute mt-2 mr-3 " icon={icon} size={20} />
                    </span>
                </div>

            </div>
        </>
    )
}

export default LoginTextFields;