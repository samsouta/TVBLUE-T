import { useState, useEffect } from 'react';

export const ScrollAlert = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-36  transform -translate-x-1/2 z-[1000] w-11/12 max-w-md animate-bounce">
      <div className="bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <svg 
            className="w-6 h-6 animate-pulse" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
          <p className="font-medium text-sm sm:text-base">
            အောက် ကို ဆွဲ ပါ , LInk က အောက် မှာရှိတယ်
          </p>
        </div>
      </div>
    </div>
  );
};