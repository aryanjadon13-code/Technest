import React from 'react'

function Header() {
  return (
    <div className='flex justify-between items-center h-15 bg-black text-white' >
        <div className='ps-5'>
            TechNest
        </div>
        <div>
            <ul className='space-x-4 hidden md:flex'>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
                <li>Home</li>
            </ul>
        </div>
        <div className='pe-5'>Login/Signup</div>

       
    </div>
  )
}

export default Header