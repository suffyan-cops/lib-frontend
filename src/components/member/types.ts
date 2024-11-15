
export interface AddMemberPropsData {
    name:string,
    phone_number:string,  
    address:string,
    email:string,
    number_of_books_issued:string,
    membership_start_date:string,
    library_id:string
}

export type AddMemberSetStateProps = React.Dispatch<React.SetStateAction<AddMemberPropsData>>;

export interface AddMemberProps {
    addMemberData: AddMemberPropsData;
    setAddMemberData: AddMemberSetStateProps;
}



export interface EditMemberPropsData {
    name:string,
    phone_number:string,  
    address:string,
    number_of_books_issued:string,
    email:string,
    membership_start_date:string,
    library_id:string
}

export type EditMemberSetStateProps = React.Dispatch<React.SetStateAction<EditMemberPropsData>>;

export interface EditMemberProps {
    editMemberData: EditMemberPropsData;
    setEditMemberData: EditMemberSetStateProps;
}
