import { Skeleton } from '@nextui-org/react'
import React from 'react'


const ModalLoader: React.FC = () => {
  return (
    <div className=' flex justify-center w-full'>
    <Skeleton className="rounded-full w-40 h-40 bg-[#7FADE0] ">
        <div className="" />
      </Skeleton>

    </div>
  )
}

export default ModalLoader