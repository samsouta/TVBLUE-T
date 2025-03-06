import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GitImg } from '../../../assets';

const Logo: React.FC = () => {
  const nav = useNavigate()
  const GoHome = () => {
    nav('/home')
  }
  return (
    <div onClick={GoHome} className="flex cursor-pointer items-center gap-2">
      <img src={GitImg.TVLogo} alt="" className=' w-16 h-16 ' />
    </div>
  )
}

export default Logo