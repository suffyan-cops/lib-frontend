import BookList from "../../components/bookComponent"

const BookPage = () => {
    return (
        <>
            <div className="relative mx-12 ">
                <h1 className="text-3xl font-bold text-primary mb-3">Books List</h1>
                <BookList/>
            </div>
        </>
    )
}

export default BookPage