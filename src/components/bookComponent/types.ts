


export interface AddBooksTypes {
    title:string,
    description:string,
    publication_year:string,
    quantity:string,
    library_id:string
}


export type AddBookSetStateProps = React.Dispatch<React.SetStateAction<AddBooksTypes>>;

export interface AddBookProps {
    addBookData: AddBooksTypes;
    setAddBookData: AddBookSetStateProps;
}



export interface EditBookTypes {
    title:string,
    description:string,
    publication_year:string,
    quantity:string,
    library_id:string
}


export type EditBookSetStateProps = React.Dispatch<React.SetStateAction<EditBookTypes>>;

export interface EditLibraryProps {
    editBookData: EditBookTypes;
    setEditBookData: EditBookSetStateProps;
}