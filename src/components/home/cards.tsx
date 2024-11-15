import { Icon } from 'react-icons-kit';
import { book } from 'react-icons-kit/feather/book';
import { users } from 'react-icons-kit/feather/users';
import { settings } from 'react-icons-kit/feather/settings';
import { info } from 'react-icons-kit/feather/info';
import { menu } from 'react-icons-kit/feather/menu';
import React from 'react';

interface CardProps {
    item:string,
    index:number
}

const HomeCards : React.FC<CardProps> = ({item , index}) => {
    const icons = [book, users,book,info,menu,settings];
    return (
        <>
            <div className="block max-w-sm p-6 bg-secondary border border-primary rounded-lg shadow hover:bg-primary  ">
                <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center"><Icon icon={icons[index]} size={50}/></h5>
                <p className="text-xl  font-bold text-gray-700 dark:text-gray-400 flex justify-center">{item.name}</p>
                <p className="text-xl  font-bold text-gray-700 dark:text-gray-400 flex justify-center mt-2">{ item.id===5 ? item.count +'%'  :  item.count} </p>

            </div>
        </>
    )
}


export default HomeCards