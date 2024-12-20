import React, { useContext } from 'react'
import { MenuItems } from '../../../data/navbar';
import GategoryBtn from './catagoryBtn/Gategorybtn';
import { useLocation, useNavigate } from 'react-router-dom';
import { StateContext } from '../../../context/StateContext';


const NavLinks: React.FC = () => {
  const nav = useNavigate();
  const location = useLocation()
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('StateContext not found');
  }
  const { setTopVid } = context;

  const handleSidebar = (path: string, text: string) => {
    const formattedPath = path.split('/').pop();
    const formattedText = text.toLocaleLowerCase();

    if (formattedText === "home") {
      nav('/');
    } else if (formattedText === 'contact') {
      nav('/contact');
    } else if (formattedPath) {
      nav(`/home/${formattedPath}`);
      setTopVid(formattedPath);
    } else {
      console.error("Formatted path is undefined");
    }
  };

  return (
    <div className="hidden md:flex items-center gap-6">
      {MenuItems.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.id}
            onClick={() => handleSidebar(link.path, link?.text)}
            className="flex items-center cursor-pointer gap-2 open-sans text-[--soft-blue] hover:text-[var(--white)] transition-colors duration-200"
          >
            <Icon className="h-5 w-5" />
            <span>{link.text}</span>
          </a>
        );
      })}
     <GategoryBtn />
    </div>
  )
}

export default NavLinks
