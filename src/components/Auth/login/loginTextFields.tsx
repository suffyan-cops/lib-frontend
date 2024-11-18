import { useState } from "react";
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import { AddMemberProps } from "./types";

const LoginTextFields : React.FC<AddMemberProps> = ({setCredential,credential,  errors}) => {
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
    <label className="text-sm font-medium text-gray-500">Email Address</label>
    <input
        type="text"
        name="email"
        placeholder="Enter Email"
        value={credential.email}
        onChange={handleChange}
        className="w-full p-2 !border !border-primary outline-none focus:!border-primary mb-1"
    />
    <div className="h-[20px] mb-2">
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
    </div>

    <label className="text-sm font-medium text-gray-500">Password</label>
    <div className="flex relative">
        <input
            type={type}
            placeholder="Enter Password"
            name="password"
            value={credential.password}
            onChange={handleChange}
            className="w-full p-2 !border !border-primary outline-none focus:!border-primary"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={handleToggle}>
            <Icon icon={icon} size={20} />
        </span>
    </div>
    <div className="h-[20px] mb-2">
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
    </div>
</div>

        </>
    )
}

export default LoginTextFields;