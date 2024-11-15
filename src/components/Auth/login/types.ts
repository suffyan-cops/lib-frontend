
export interface LoginProps {
    email: string;
    password: string;
}

export type SetLoginStateProps = React.Dispatch<React.SetStateAction<LoginProps>>;

export interface AddMemberProps {
    credential: LoginProps;
    setCredential: SetLoginStateProps;
}



export interface LoginButtonProps {
    loading:boolean;
    userLogin: ()=> void;
}