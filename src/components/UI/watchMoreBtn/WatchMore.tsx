import React from 'react'

import { ChevronsRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WatchMore: React.FC = () => {
  return (
    <>
      <Link
        className='flex  gap-2 cursor-pointer px-4 py-3 dark:hover:bg-black bg-black hover:bg-white hover:text-black text-white border-black dark:hover:text-white transition-all border-2 dark:border-white dark:bg-white dark:text-black rounded-full font-semibold'
        to={'/home'}
      >
        Watch More - Click Here
        <ChevronsRight />
      </Link>
    </>
  );
};

export default WatchMore;
