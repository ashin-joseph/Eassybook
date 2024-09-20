import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
    <div className='md:container md:mx-auto flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-500'>

        <div className='text-4xl mycolor text-green-800 '>Eassybook </div>

        <ul className='hidden: md:flex items-start gap-5 font-medium'>

        <NavLink to='/'>
            <li className='py-1'>Home </li>
            <hr className='border-none outline-none h-0.5 w-3/5 m-auto bg-green-800 hidden'/></NavLink>
        <NavLink to='Appointments'>
            <li className='py-1'>Appointment</li> 
            <hr  className='border-none outline-none h-0.5 w-3/5 bg-green-800 m-auto hidden'/></NavLink>

        </ul>
        <div className='hidden: md:flex items-end font-bold decoration-transparent'><button className='text-green-800 '>.</button></div>
    </div>
    </div>
  )
}

export default Navbar
