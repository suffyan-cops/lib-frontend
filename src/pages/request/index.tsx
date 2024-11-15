import RequestList from "../../components/request"

const RequestPage =()=>{
    return (
        <>
           
            <div className="relative mx-12 ">
        <h1 className="text-3xl font-bold text-primary mb-3">Requests List</h1>
        <RequestList/>
        </div>
        </>
    )
}

export default RequestPage