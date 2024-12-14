import React from 'react'
import { RotatingLines } from 'react-loader-spinner';

const TvLoader: React.FC = () => {
  return (
    <>
            <div className='flex justify-center items-center fixed backdrop-blur-sm inset-0 z-50 bg-opacity-50 bg-black/40'>
                <div className='flex justify-center items-center'>
                    
                    <RotatingLines
                        visible={true}
                        height="50"
                        width="50"
                        strokeColor="#e7efff"
                        strokeWidth="4"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </div>
        </>
  )
}

export default TvLoader