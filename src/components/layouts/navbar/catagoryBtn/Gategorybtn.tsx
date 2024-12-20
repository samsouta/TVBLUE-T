import React, { useCallback, useContext } from 'react';
import { useGetAllgenreQuery } from '../../../../redux/api/getAllGern';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { ChevronDown, Film } from 'lucide-react';
import { StateContext } from '../../../../context/StateContext';
import { useNavigate } from 'react-router-dom';


const GategoryBtn: React.FC = () => {
    const { data, error, isLoading } = useGetAllgenreQuery();
    const genres = data?.genres || [];

    const nav = useNavigate()
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('StateContext not found');
    }
    const { setGenCurrentPage,setCurrentPage ,setIsOpen} = context;

    const HandleAction = useCallback((key: string) => {
        nav(`/categories/${key}`)
        setGenCurrentPage(key)
        setIsOpen(false)
        window.scrollBy({
            top: 0,
            behavior: 'smooth',
        });
        localStorage.removeItem('currentPage');
        setCurrentPage(1)
    },[setGenCurrentPage,setCurrentPage])


    // Error and Loading Handling
    if (isLoading) {
        return <div className='open-sans text-[--soft-blue]  ' >Loading...</div>;
    }

    if (error) {
        return <div className=' text-red-600 text-2xl' >Error: Please Refresh page & try again later :</div>;
    }

    return (
        <div>
            <Dropdown
                className='bg-[var(--medium-blue)]'
            >
                <DropdownTrigger >
                    <a className=' flex gap-x-2 items-center open-sans text-[--soft-blue] cursor-pointer text-md bg-transparent hover:bg-transparent hover:text-[--soft-blue] '>
                        <Film className='text-sm' />
                        Categories
                        <ChevronDown className='text-sm' />
                    </a>


                </DropdownTrigger>
                <DropdownMenu
                    onAction={HandleAction}
                    defaultSelectedKeys={'All'}
                    // onSelectionChange={(key)=> genCurrentPage === key}
                    className='h-[200px] overflow-y-scroll'
                    aria-label="Category Actions"
                    variant="flat"
                >
                    {genres.map((gen, index) => (
                        <DropdownItem
                            className='open-sans text-[--white]'
                            key={gen || index}
                        >
                            {gen}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default GategoryBtn;
