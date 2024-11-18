import { edit } from 'react-icons-kit/feather/edit';
import { trash2 } from 'react-icons-kit/feather/trash2';
import { Icon } from 'react-icons-kit';
import React, { useState } from 'react';
import { getLocalStorageItem } from '../../../services/localStorageItem';
import './custom.css'
import BooksAgainstLibrary from '../../bookComponent/booksAgiantsLibrary';
import FetchBooksWithReturnDate from '../../bookComponent/fetchBooksAgainsstRequest';


const Table = ({ header, data, placeholder, handleDeleteRecord, handelEditRecord, setSearchValue, searchValue, isRole, handleKeyPress, indexName }) => {
  const role = getLocalStorageItem('role');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [expandedRow, setExpandedRow] = useState(null);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleAccordion = (rowIndex) => {
    if(role !== 'reader' && (indexName==='library' || indexName==='book') ){
      setExpandedRow((prev) => prev === rowIndex ? null : rowIndex);
    }
  };

  return (
    <div className="overflow-x-auto ">
      <input
        type="text"
        placeholder={placeholder}
        className="w-80 p-2 !border !border-primary outline-none focus:!border-primary mb-5"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyUp={handleKeyPress}
      />
      <div className="max-h-[600px] overflow-y-auto">
      <table className="table-fixed w-full">
        <thead  >
          <tr>
            {header.map((col, index) => (
              isRole === "reader" && col.name.toLowerCase() === "actions" ? null : (
                <th key={index} className="border border-primary !p-7" >
                  {col.name}
                </th>
              )
            ))}
          </tr>
        </thead>
        <tbody className="">
          {currentItems?.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <tr className="cursor-pointer hover:bg-primary">
                {header.map((col, colIndex) => (
                  isRole === "reader" && col.selector === "action" ? null : (
                    <td key={colIndex} className="border border-primary !p-4" style={{ width: col.width || 'auto', whiteSpace: 'nowrap',  
                      overflow: 'hidden',
                      textOverflow: 'ellipsis', }}>
                      {col.selector === "action" ? (
                        <>
                          {row['status'] === "Completed" && role === 'reader' ? null : (
                            <>
                              <Icon size={20} icon={edit} className={`cursor-pointer ${col.selector === "status" && row[col.selector] === "Completed" ? '!hidden' : ''}`} onClick={() => handelEditRecord(row)} />
                              <Icon size={20} icon={trash2} className={`cursor-pointer ml-7 ${col.selector === "status" && row[col.selector] === "Completed" ? '!hidden' : ''}`} onClick={() => handleDeleteRecord(row)} />
                            </>
                          )}
                        </>
                      ) : col.selector === "status" ? (
                        row[col.selector] === "Submitted" ? (
                          <span>Submitted</span>
                        ) : row[col.selector] === "Rejected" ? (
                          <span className="text-red-500">Rejected</span>
                        ) : (
                          <span className="text-green-500">Completed</span>
                        )
                      ) : (
                        <span onClick={() => toggleAccordion(rowIndex)}>{row[col.selector] ?? "N/A"}</span>
                      )}
                    </td>
                  )
                ))}
              </tr>

              {expandedRow === rowIndex && (
                <tr className="transition-all duration-300">
                  <td colSpan={header.length} className="p-2 bg-secondary border border-primary transition-all duration-300" >
                    <div className="transition-all duration-300">
                      {indexName==='library' && role==='super_admin'? (<BooksAgainstLibrary library={row}/>) : 
                      indexName==='book' && (role==='super_admin' || role==='librarian') ? (<FetchBooksWithReturnDate book={row}/>)  :
                      < >
                        <div className='!hidden'></div>
                     </>
                      }
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      </div>

      <div className="flex justify-center my-4">
        {Array.from({ length: Math.ceil(data?.length / itemsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-3 py-1 mx-1 ${currentPage === i + 1 ? "bg-primary text-white" : "bg-gray-300"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table;
