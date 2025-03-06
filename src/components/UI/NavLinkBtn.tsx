import React, { useCallback } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SubGenreDataType } from '../../types/GenreType';

type DataType = {
    name: string;
    tag: SubGenreDataType[];
};

const NavLinkBtn: React.FC<DataType> = ({ name, tag }) => {

    /**
     * @router for navigate
     */
    const navigate = useNavigate();


    /**
     * @List for list of genres
     */
    const List = ['genres', 'makers', 'series', 'short', 'actresses'];


    /**
     * @function 
     * @handleAction for handle action
     */
    const handleAction = useCallback(
        (key: React.Key) => {
            // Convert the key to lowercase and remove spaces
            const selectedGenre = key.toString().toLowerCase().replace(/\s+/g, '');
            // Check if the selected genre is 'new release' 
            if (selectedGenre === 'newrelease') {
                // Navigate to the new release page
                navigate(`/new-release`, { replace: true });
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            } else if (List.includes(selectedGenre)) {
                navigate(`/actresses`, { replace: true });
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            } else if (selectedGenre) {
                navigate(`/gn/${selectedGenre}`, { replace: true });
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }

        },
        [navigate]
    );


    return (
        <div>
            <Dropdown className="bg-black/20 backdrop-blur-xl">
                <DropdownTrigger>
                    <h1 className="flex gap-x-2 items-center poppins-semibold text-[var(--light-blue)] cursor-pointer text-sm lg:text-lg bg-transparent hover:bg-transparent hover:text-[--soft-blue]">
                        {name}
                        <ChevronDown className="text-sm" />
                    </h1>
                </DropdownTrigger>
                <DropdownMenu
                    onAction={handleAction}
                    className="h-[200px] overflow-y-scroll"
                    aria-label="Category Actions"
                    variant="flat"
                >
                    {tag.map((subGenre) => (
                        <DropdownItem
                            key={subGenre.name}
                        >
                            <span
                                className=" poppins-regular text-sm lg:text-lg font-bold text-[var(--light-blue)] "
                            >{subGenre.name}</span>
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default React.memo(NavLinkBtn);
