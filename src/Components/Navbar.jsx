import React from 'react'
import {assets} from '../assets/assets'
import { NavLink } from 'react-router-dom'
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [showmenu, setShowMenu]=useState(false)
    const [token,setToken]
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img src={assets.logo} alt="" className="w-36 h-35 cursor-pointer"/>
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to='/'>
                <li className='py-1'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/beautician'>
                <li className='py-1'>ALL SERVICES</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/about'>
                <li className='py-1'>ABOUT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1'>CONTACT</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
            </NavLink>
        </ul>
        <div className='flex item-center gap-4'>
            {
            token
            ? <div><div/>
            :<button onClick={()=>navigate('/login')} className='bg-black text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
            }
        </div>
    </div>
  )
}

export default Navbar