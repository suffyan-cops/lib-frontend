export const endPoints ={
    login : '/user/sign_in',
    logout : '/user/sign_out',
    addLibrary : '/api/v1/library',
    fetchAllLibraries : '/api/v1/library',
    deleteLibrary : '/api/v1/library/:id',
    updateLibrary :'/api/v1/library/:id',
    searchValueLibrary : '/api/v1/library/search',
    addBook :'/api/v1/book',
    fetchAllBooks : '/api/v1/book',
    deleteBook : '/api/v1/book/:id',
    updateBook :'/api/v1/book/:id',
    searchBookByTitle : '/api/v1/book/search',
    addUser : '/user',
    updateUser: '/api/v1/user/:id',
    deleteUser : '/api/v1/user/:id',
    editUser : '/user',
    getUsers : '/api/v1/user',
    searchUserByName:'/api/v1/user/search',
    addMember :'/api/v1/member',
    getMembers :'/api/v1/member',
    deleteMember : '/api/v1/member/:id',
    updateMember : '/api/v1/member/:id',
    searchMemberByName: '/api/v1/member/search',
    getReadersList : '/api/v1/user/getReaders',
    getBooksAgainstUserLibrary : '/api/v1/book/getBooksAgainstUserLibrary',
    addRequest : '/api/v1/request',
    getRequestList : '/api/v1/request',
    deleteRequest : '/api/v1/request/:id',
    updateRequest : '/api/v1/request/:id',
    searchRequestByStatus : '/api/v1/request/search',
    fetchBookCount :'/api/v1/book/fetchBookCount',
    fetchLibraryCount : '/api/v1/library/fetchLibraryCount',
    issuedBookCount : '/api/v1/request/issuedBooksCount',
    membersCount: '/api/v1/member/fetchMemberCount',
    availableBooksCount : '/api/v1/book/fetchAvailableBooksCount',
    libraryCount : '/api/v1/library/fetchLibCount',
    getBooksAgainstLibrary : '/api/v1/book/get_books_by_library_id',
}


export const baseUrl =  import.meta.env.VITE_API_BASE_URL;   // used in sideBarItem

export const roles = ["super_admin", "librarian", "reader"];