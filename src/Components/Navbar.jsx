// import React, { useState } from 'react'
// import {assets} from '../assets/assets'
// import { NavLink, useNavigate } from 'react-router-dom'
// import './Navbar.css';

// const Navbar = () => {
//     const navigate = useNavigate();
//     const [showmenu, setShowMenu]=useState(false)
//     const [token,setToken]=useState(true)
//   return (
//     <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
//         <img src={assets.logo} alt="" className=" cursor-pointer w-24 h-20 rounded-lg shadow-lg hover:scale-105 transition-all duration-300"/>
//         <ul className='hidden md:flex items-start gap-5 font-medium'>
//             <NavLink to='/'>
//                 <li className='py-1'>HOME</li>
//                 <hr className='border-none outline-none h-0.5 bg-beige w-3/5 m-auto hidden'/>
//             </NavLink>
//             <NavLink to='/beauticians'>
//                 <li className='py-1'>BEAUTICIANS</li>
//                 <hr className='border-none outline-none h-0.5 bg-beige w-3/5 m-auto hidden'/>
//             </NavLink>
//             <NavLink to='/about'>
//                 <li className='py-1'>ABOUT</li>
//                 <hr className='border-none outline-none h-0.5 bg-beige w-3/5 m-auto hidden'/>
//             </NavLink>
//             <NavLink to='/contact'>
//                 <li className='py-1'>CONTACT</li>
//                 <hr className='border-none outline-none h-0.5 bg-beige w-3/5 m-auto hidden'/>
//             </NavLink>
//         </ul>
//         <div className='flex item-center gap-4'>
//             {
//             token
//             ? <div className='flex items gap-2 cursor-pointer group relative'> 
//                 <img className='w-14 rounded-full' src={assets.profile_pic} alt=""/>
//                 <img className='w-2.5' src={assets.dropdown_icon} alt=""/>
//                 <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
//                   <div className='min-w-48 bg-stone-100 rounded flex flex flex-col gap-4 p-4' >
//                     <p onClick={()=>navigate('my-profile')}className='hover:text-black cursor-pointer'>My Profile</p>
//                     <p onClick={()=>navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
//                     <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
//                     </div>
//             </div>
//             </div>
            
//             :<button onClick={()=>navigate('/login')} className='bg-black text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
//             } 
//         </div>
//     </div>
//   )
// }
// export default Navbar



import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
// Import Firebase auth functions
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, firestore } from "../firebase"; // Adjust this path to where you've defined your Firebase config

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to home after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex items-center justify-between text-sm py-1 mb-1 border-b border-gray-700 bg-black text-white">
      <img 
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo" 
        className="w-32 h-20 cursor-pointer rounded-lg shadow-md hover:scale-105 transition-all duration-300"
      />
      <ul className="hidden md:flex items-center gap-6 font-medium">
        <NavLink to="/" className="relative hover:text-gray-300 transition-colors duration-300">
          <li className="py-2 text-base">HOME</li>
          <hr className="absolute left-0 bottom-0 w-3/5 m-auto h-0.5 bg-gray-600 hidden" />
        </NavLink>
        <NavLink to="/beautician" className="relative hover:text-gray-300 transition-colors duration-300">
          <li className="py-2 text-base">BEAUTICIANS</li>
          <hr className="absolute left-0 bottom-0 w-3/5 m-auto h-0.5 bg-gray-600 hidden" />
        </NavLink>
        <NavLink to="/about" className="relative hover:text-gray-300 transition-colors duration-300">
          <li className="py-2 text-base">ABOUT</li>
          <hr className="absolute left-0 bottom-0 w-3/5 m-auto h-0.5 bg-gray-600 hidden" />
        </NavLink>
        <NavLink to="/contact" className="relative hover:text-gray-300 transition-colors duration-300">
          <li className="py-2 text-base">CONTACT</li>
          <hr className="absolute left-0 bottom-0 w-3/5 m-auto h-0.5 bg-gray-600 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-14 rounded-full" src={assets.profile_pic} alt="Profile" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate('my-profile')}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate('my-appointments')}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p 
                  onClick={handleLogout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Login button for desktop */}
            <button
              onClick={() => navigate('/login')}
              className="mr-5 bg-black text-white px-8 py-3 rounded-full font-light hidden md:block border border-white hover:bg-white hover:text-black transition-colors duration-300"
            >
              Create account
            </button>
            {/* Login button for mobile */}
            <button
              onClick={() => navigate('/login')}
              className="mr-2 text-white md:hidden flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="ml-1">Login</span>
            </button>
          </>
        )}
        <img onClick={()=>setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt=""/>
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-black tranisition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt=""/>
            <img  className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt=""/>      
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium '>
            <NavLink onClick={()=>setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/beautician'><p className='px-4 py-2 rounded inline-block'> ALL BEAUTICIANS</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
            {!isLoggedIn && (
              <NavLink onClick={()=>setShowMenu(false)} to='/login'>
                <p className='px-4 py-2 rounded inline-block bg-white text-black'>LOGIN</p>
              </NavLink>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;