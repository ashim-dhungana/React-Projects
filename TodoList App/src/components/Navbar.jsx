import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-800 text-white py-3'>

        <div className="logo">
            <span className="font-bold text-xl mx-9">Task Planner</span>
        </div>

        <ul className="flex gap-8 mx-9">
            <li className="cursor-pointer hover:font-bold transition-all">Home</li>
            <li className="cursor-pointer hover:font-bold transition-all">About</li>
            <li className="cursor-pointer hover:font-bold transition-all">Contact</li>
        </ul>

    </nav>
  )
}

export default Navbar