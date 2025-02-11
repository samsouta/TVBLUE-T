import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getQuery } from '../../../../services/slice/SearchEngineSlice';
import { setCurrentSection } from '../../../../services/slice/ScrollSlice';

const SearchBar: React.FC = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dispatch = useDispatch();
    const nav = useNavigate();

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleSearchKeyDown = useCallback(
        async (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && searchQuery.trim()) {
                e.preventDefault();
                try {
                    // Dispatch search query to Redux
                    dispatch(getQuery(searchQuery)); // Set the search results
                    nav(`/search/${searchQuery}`);
                    dispatch(setCurrentSection(true));

                    // Clear the search input after processing
                    setSearchQuery(""); // Clear input state
                } catch (err) {
                    console.error('Search failed:', err);
                }
            }
        },
        [searchQuery, dispatch, nav]
    );

    return (
        <div className={`relative transition-all duration-300 ${isFocused ? 'sm:w-60 w-40' : 'w-40'}`}>
            <input
                type="text"
                value={searchQuery} // Bind state to input value
                placeholder="Search videos..."
                className="w-full px-3 py-1.5 pl-8 text-[16px] sm:text-sm placeholder:text-[12px] text-[var(--light-blue)] placeholder-white bg-white/10 border border-[var(--medium-blue)] rounded-lg 
                            focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40
                            transition-all duration-300"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={handleSearchChange} // Update state on input change
                onKeyDown={handleSearchKeyDown} // Handle Enter key
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[var(--medium-blue)]" />
        </div>
    );
};

export default SearchBar;
