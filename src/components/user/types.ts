
export interface AddUserPropsData {
    name: string;
    email: string;
    role:number;
    library_id: string;
    password: string;
}

export type AddUserSetStateProps = React.Dispatch<React.SetStateAction<AddUserPropsData>>;

export interface AddUserProps {
    addUserRecord: AddUserPropsData;
    setAddUserRecord: AddUserSetStateProps;
}



export interface EditUserPropsData {
    name: string;
    email: string;
    role:string;
    library_id: string;
    password: string;
}

export type EditUserSetStateProps = React.Dispatch<React.SetStateAction<EditUserPropsData>>;

export interface EditUserProps {
    editUserData: EditUserPropsData;
    setEditUserData: EditUserSetStateProps;
}


export const Roles =[{id:1, name:'Librarian'}, {id:2, name:'Reader'}  ];