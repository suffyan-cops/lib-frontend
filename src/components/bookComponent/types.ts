


export interface AddBooksTypes {
    title:string,
    description:string,
    publication_year:string,
    quantity:string,
    library_id:string
}

export interface AddBooksError {
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
    errors? : AddBooksError
}



export interface EditBookTypes {
    title:string,
    description:string,
    publication_year:string,
    quantity:string,
    library_id:string
}

export interface EditBooksError {
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
    errors? : EditBooksError
}



export interface BookTableType{
    library  :{
        title:string,
        description:string,
        publication_year:string,
        quantity:string,
    }

}
