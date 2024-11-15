import HomeCards from "./cards"
import { useFetchCounts } from "../../hooks/useFecthCounts"
import { getLocalStorageItem } from "../../services/localStorageItem";
const CardsListing = () => {
    const  {bookCount,memberCount,issuedBookCount,libraryCount,availableBookCount, libCount} =useFetchCounts();
    const role =getLocalStorageItem("role");
    const librarianViewData =[
        { 
            id:1,
            count:bookCount,
            name:"Total Books"
        },
        {
            id:2,
            count:libraryCount,
            name:"Librarians"

        },
        {
            id:3,
            count:issuedBookCount,
            name:"Issued Books"
        },
        { 
            id:4,
            count:memberCount,
            name:"Member Count"
        },
        {
          
            id:5,
            count: Math.floor((issuedBookCount / bookCount) * 100),
            name:"Percentage of Issued Books"
        }]


        const SuperViewData =[
            { 
                id:1,
                count:bookCount,
                name:"Total Books"
            },
            {
                id:2,
                count:libraryCount,
                name:"Librarians"
    
            },
            {
                id:3,
                count:libCount,
                name:"Libraries"
            },
            { 
                id:4,
                count:memberCount,
                name:"Member Count"
            }]
            const ReaderViewData =[
                {
                    id:1,
                    count:issuedBookCount,
                    name:"Issued Books"
                },
                {
                    id:2,
                    count:availableBookCount,
                    name:"Available Books"
                }]

                const displayList = role==='super_admin' ? SuperViewData : role==='librarian'? librarianViewData : ReaderViewData;
    return (
        <>
            <div className="relative mx-12 flex flex-wrap gap-3">
                {displayList.map((item, index) => (
                    <div className="flex" key={`${index} + ${item.id}`}>
                        <HomeCards item={item} index={index}/>
                    </div>

                ))}
            </div>
        </>
    )
}

export default CardsListing