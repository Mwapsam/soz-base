import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, MobileNav, Typography, Button, IconButton, Avatar, Popover, PopoverHandler, PopoverContent} from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import useCart from '../../pages/hooks/useCart';
import useUser from "../../pages/hooks/useUser";
 
export default function NavBar() {
  const [openNav, setOpenNav] = useState(false);
  const { count } = useCart();
  const { onLogOut, user } = useUser();

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  console.log(user);
 
  const navList = (
    <ul className="mb-4 mt-6 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="font-bold uppercase focus:font-normal"
      >
        <Link to='/' className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold uppercase focus:font-normal"
      >
        <Link to='/contact' className="flex items-center">
          Contact
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold uppercase focus:font-normal"
      >
        {currentUser && user.role === 'admin' && <Link to='/dashboard' className="flex items-center">
          Dashboard
        </Link>}
      </Typography>
    </ul>
  );
 
  return (
    <Navbar shadow={false} style={{borderRadius: 0 }} className="py-6 fixed top-0 lg:py-4">
      <div className="w-full flex items-center justify-between text-blue-gray-900">
        <img src={logo} alt="logo" className="h-[3rem] w-[3rem]" />
        <div className="hidden lg:block">{navList}</div>
          <div className='flex gap-8 items-center'>
                <Link to="/cart" className="hidden lg:block relative text-xs">
                  <span className="absolute text-white bg-red-600 rounded-full px-1 mt-[-14px] ml-4">{count?.carts[0].total_quantity || 0}</span>
                  <FontAwesomeIcon icon={faCartShopping} className="cursor-pointer font-extrabold text-2xl" />
                </Link>
            {user && 
            (<>
                <Button onClick={onLogOut} type="submit" variant="gradient" size="sm" fullWidth className="hidden lg:block relative text-xs">
                  <span>Logout</span>
                </Button>
              </>
            )}
        
            {!user && 
            (<>
            <div className="flex w-max items-end gap-4">
              <Link to="/login" className="hidden lg:block relative text-xs">
                <Button size="sm">Login</Button>
              </Link>
              <Link to="/register" className="hidden lg:block relative text-xs">
                <Button size="sm">Register</Button>
              </Link>

            </div>
            </>)}
          </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        {navList}
        {user ? (<Button onClick={onLogOut} type="submit" variant="gradient" size="sm" fullWidth className="mb-2">
          <span>Logout</span>
        </Button>) :

        (<>
          <Link to='/login'>
            <Button onClick={onLogOut} type="submit" variant="gradient" size="sm" fullWidth className="mb-2">
              <span>Login</span>
            </Button>
          </Link>
          <Link to='/register'>
            <Button onClick={onLogOut} type="submit" variant="gradient" size="sm" fullWidth className="mb-2">
              <span>Register</span>
            </Button>
          </Link>
          </>)}
      </MobileNav>
    </Navbar>
  );
}