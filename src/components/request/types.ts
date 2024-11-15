
export interface AddRequestPropsData {
    book_id: string;
    user_id: string;
    status: string;
    returned_date: string;

}

export type AddRequestSetStateProps = React.Dispatch<React.SetStateAction<AddRequestPropsData>>;

export interface AddRequestProps {
    addRequestRecord: AddRequestPropsData;
    setAddRequestRecord: AddRequestSetStateProps;
}



export interface EditRequestPropsData {
    book_id: string;
    user_id: string;
    status: string;
    returned_date: string;
}

export type EditRequestSetStateProps = React.Dispatch<React.SetStateAction<EditRequestPropsData>>;

export interface EditRequestProps {
    editRequestData: EditRequestPropsData;
    setEditRequestData: EditRequestSetStateProps;
}
