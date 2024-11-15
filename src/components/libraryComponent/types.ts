


export interface AddLibraryTypes {
    name:string,
    phone_number:string,
    address:string,
    email:string,
    website:string
}


export type AddLibrarySetStateProps = React.Dispatch<React.SetStateAction<AddLibraryTypes>>;

export interface AddLibraryProps {
    addLibraryData: AddLibraryTypes;
    setAddLibraryData: AddLibrarySetStateProps;
}



export interface EditLibraryTypes {
    name:string,
    phone_number:string,
    address:string,
    email:string,
    website:string
}


export type EditLibrarySetStateProps = React.Dispatch<React.SetStateAction<EditLibraryTypes>>;

export interface EditLibraryProps {
    editLibraryData: EditLibraryTypes;
    setEditLibraryData: EditLibrarySetStateProps;
}

export  const headers = [{ name: "Title", selector: "name" }, { name: "Phone", selector: "phone_number" }, { name: "Email", selector: "email" }, { name: "Address", selector: "address" }, { name: "Website", selector: "website" }, { name: "Actions", selector: "action" }];
