import React from 'react'

import { ChevronsRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WatchMore: React.FC = () => {
  return (
    <>
      <Link
        className='flex  gap-2 cursor-pointer px-4 py-3 bg-[var(--soft-blue)] hover:bg-[var(--light-blue)] hover:text-black text-white border-[var(--light-blue)]  transition-all border-2  rounded-full merriweather-regular'
        to={'/home'}
      >
        Watch More - Click Here
        <ChevronsRight />
      </Link>
    </>
  );
};

export default WatchMore;
