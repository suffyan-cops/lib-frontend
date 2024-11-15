import MemberList from "../../components/member"

const MemberPage =()=>{
    return (
        <>
        <div className="relative mx-12 ">
        <h1 className="text-3xl font-bold text-primary mb-3">Members List</h1>
            <MemberList />
        </div>
        </>
    )
}

export default MemberPage