import React, { useContext } from 'react';
import { useGetAllgenreQuery } from '../../../redux/api/getAllGern';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { ChevronDown, Film } from 'lucide-react';
import { StateContext } from '../../../context/StateContext';


const GategoryBtn: React.FC = () => {
    const { data, error, isLoading } = useGetAllgenreQuery();
    const genres = data?.genres || [];

    const context = useContext(StateContext);
    if (!context) {
        throw new Error('StateContext not found');
    }
    const { setGenCurrentPage } = context;

    const HandleAction = (key: React.Key) => {
        setGenCurrentPage(key)
        window.scrollBy({
            top: 400, 
            behavior: 'smooth',
        });
    }


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

                    <Button className='open-sans text-[--soft-blue] text-md  hover:text-[--white] bg-transparent' variant="flat">
                        <Film className=' text-sm' />
                        Categories
                        <ChevronDown className=' text-sm' />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    onAction={HandleAction}
                    defaultSelectedKeys={'All'}
                    // onSelectionChange={(key)=> genCurrentPage === key}
                    className='h-[200px] overflow-y-scroll'
                    aria-label="Category Actions"
                >
                    <DropdownItem
                        className='open-sans text-[--white]'
                        key={'All'}

                    >
                        All
                    </DropdownItem>
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
