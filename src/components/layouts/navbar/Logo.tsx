import React from 'react'
import { Tv } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Logo: React.FC = () => {
  const nav = useNavigate()
  const GoHome = () => {
    nav('/')
  }
  return (
    <div onClick={GoHome} className="flex cursor-pointer items-center gap-2">
      <Tv className="h-8 w-8 text-blue-500" />
      <span className="text-xl kablammo text-[var(--soft-blue)]">TVblue</span>
    </div>
  )
}

export default Logo