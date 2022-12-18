import React, { useState } from 'react';
import { navLinks } from './constants';

const Navbar = () => {
  const [toggle, setToggle] = useState(false)
  return (
    <div className="w-full flex py-6 justify-center items-center">
      <img src={logo} alt='hoobank' className="w-[124px] h-[32px]" />
      <ul className='list-none sm:flex hidden justify-center items-center flex-1'>
          {navLinks.map((nav, index) => (
            <li 
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[18px] ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'} text-stone-900`}
              >
                <a href={`${nav.id}`}>
                  {nav.title}
                </a>

            </li>
          ))}
      </ul>
      <div className='sm:hidden flex flex-1 justify-end items-center mx-4'>
        <img 
          src={toggle ? close : menu}
          alt="icon" 
          className={`${toggle ? 'w-[20px] h-[20px]': 'w-[28px] h-[28px]' } object-contain cursor-pointer`}
          onClick={() => setToggle((prev) => !prev)}
        />
        <div className={`${toggle ? 'flex card' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
          <ul className='list-none flex flex-col justify-end items-center flex-1'>
            {navLinks.map((nav, index) => (
              <li 
                key={nav.id}
                className={`font-poppins font-normal cursor-pointer text-[17px] ${index === navLinks.length - 1 ? 'mr-0' : 'mb-4'} text-gray-900`}
                >
                  <a href={`#${nav.id}`}>
                    {nav.title}
                  </a>

              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar

