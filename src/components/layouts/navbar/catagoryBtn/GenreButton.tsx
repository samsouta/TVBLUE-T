import React, { useCallback, useContext } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { ChevronDown } from 'lucide-react';
import { StateContext } from '../../../../context/StateContext';
import { useNavigate } from 'react-router-dom';
import { SubGenreDataType } from '../../../../types/GenreDataType';

type DataType = {
    name: string;
    tag: SubGenreDataType[];
};

const GenreButton: React.FC<DataType> = ({ name, tag }) => {
    const navigate = useNavigate();
    const context = useContext(StateContext);

    const List = ['genres', 'makers', 'series', 'short' , 'actresses'];
    if (!context) {
        throw new Error('StateContext not found');
    }

    const { setIsOpen } = context;

    const handleAction = useCallback(
        (key: React.Key) => {
            const selectedGenre = key.toString().toLowerCase().replace(/\s+/g, '');

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
                // For other genres, navigate as usual
                localStorage.setItem('selectedGenre', selectedGenre);
                navigate(`/gn/${selectedGenre}`, { replace: true });

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
                // don't need now 
                // dispatch(setCurrentSection(true))
            }

            // Close dropdown
            setIsOpen(false);
        },
        [navigate, setIsOpen]
    );


    return (
        <div>
            <Dropdown className="bg-[var(--medium-blue)]">
                <DropdownTrigger>
                    <h1 className="flex gap-x-2 items-center open-sans text-[--white] cursor-pointer text-md bg-transparent hover:bg-transparent hover:text-[--soft-blue]">
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
                            className="open-sans text-[--white]"
                            key={subGenre.name}
                        >
                            {subGenre.name}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default React.memo(GenreButton);
