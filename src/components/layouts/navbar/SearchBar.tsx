import React, { useCallback, useContext, useState } from 'react';
import { Search } from 'lucide-react';
import { HandleSearch } from '../../../utils/HandleSearch';
import { useGetVidPageQuery } from '../../../redux/api/getVideoPage';
import { StateContext } from '../../../context/StateContext';
import { useGetAllVideosQuery } from '../../../redux/api/getAllVideos';
import { createTheme, Input, MantineProvider } from '@mantine/core'

// const theme = createTheme({
//     components: {
//       Input: Input.extend({
//         classNames: {
//           input: classes.input,
//         },
//       }),

//       InputWrapper: Input.Wrapper.extend({
//         classNames: {
//           label: classes.label,
//         },
//       }),
//     },
//   });


const SearchBar: React.FC = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const { data } = useGetVidPageQuery();
    const { data: allvid } = useGetAllVideosQuery();
    const vidPage = data?.data || [];

    const context = useContext(StateContext);
    if (!context) {
        throw new Error('StateContext not found');
    }
    const { setVideos } = context;


    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
    }, [setSearchQuery]);

    const handleSearchKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            HandleSearch(searchQuery, setVideos, allvid, vidPage, setSearchQuery); // Pass vidPage instead of data
        }
    }, [searchQuery, setVideos, vidPage, setSearchQuery]);

    return (
        <div className={`relative transition-all duration-300 ${isFocused ? 'sm:w-60 w-40' : 'w-40'}`}>
            <input
                type="text"
                placeholder="Search videos..."
                className="w-full px-3 py-1.5 pl-8 text-[16px] sm:text-sm placeholder:text-[12px] text-[var(--light-blue)] placeholder-gray-300 bg-white/10 border border-white/10 rounded-lg 
                            focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40
                            transition-all duration-300"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
            />

            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
    );
};

export default SearchBar;