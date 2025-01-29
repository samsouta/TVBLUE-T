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
      <img src={GitImg.gitLogo} alt="" className=' w-14 h-14 absolute top-4 left-40' />
      <span className="text-2xl kablammo text-[var(--soft-blue)]">TVblue</span>
    </div>
  )
}

export default Logo