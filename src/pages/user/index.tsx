import UserList from "../../components/user"

const UserPage = () => {
    return (
        <>
            <div className="relative mx-12 ">
                <h1 className="text-3xl font-bold text-primary mb-3">Users List</h1>
                <UserList/>
            </div>
        </>
    )
}

export default UserPage