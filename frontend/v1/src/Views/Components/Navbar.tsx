import React from 'react';

const Navbar: React.FC = () => {

  return (
    <div className='fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#0a192f] text-gray-300'>
      {/* menu */}
      <ul className='hidden md:flex'>
        <li>
            <a href="/">Home</a>
        </li>
        <li>
            <a href="/calendar">Calendar</a>
        </li>
        <li>
            <a href="/about">About</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
