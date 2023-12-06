import React, { useState } from 'react';

import LinkButton from '@/components/LinkButton';

interface BurgerMenuProps {}

const BurgerMenu: React.FC<BurgerMenuProps> = ({}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='relative'>
      <button
        className='space-y-1 group'
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-haspopup='true'
      >
        <div className='w-6 h-1 bg-fuchsia-400'></div>
        <div className='w-6 h-1 bg-fuchsia-400'></div>
        <div className='w-6 h-1 bg-fuchsia-400'></div>
      </button>

      {/* menu */}
      {menuOpen && (
        <ul className={`bg-fuchsia-50 w-96 absolute -top-full right-0 duration-300 flex flex-col justify-end`}>
          <button className='px-4 py-9 relative' onClick={toggleMenu}>
            <div className='w-6 h-1 rotate-45 absolute bg-fuchsia-400'></div>
            <div className='w-6 h-1 -rotate-45 absolute bg-fuchsia-400'></div>
          </button>
          <LinkButton to='/profile/edit' className='flex justify-center w-full py-4 bg-fuchsia-50 hover:bg-fuchsia-200 rounded-none !text-fuchsia-400 text-xl'>Profile</LinkButton>
          <LinkButton to='/settings' className='flex justify-center w-full py-4 bg-fuchsia-50 hover:bg-fuchsia-200 rounded-none !text-fuchsia-400 text-xl'>Settings</LinkButton>
          <LinkButton to='/logout' className='flex justify-center w-full py-4 bg-fuchsia-50 hover:bg-fuchsia-200 rounded-none !text-fuchsia-400 text-xl'>Log out</LinkButton>
        </ul>
      )}
    </div>
  );
};

export default BurgerMenu;
