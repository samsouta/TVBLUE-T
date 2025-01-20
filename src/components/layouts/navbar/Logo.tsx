import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logo: React.FC = () => {
  const nav = useNavigate()
  const GoHome = () => {
    nav('/home')
  }
  return (
    <div onClick={GoHome} className="flex cursor-pointer items-center gap-2">
      <span className="text-2xl kablammo text-[var(--soft-blue)]">TVblue</span>
    </div>
  )
}

export default Logo