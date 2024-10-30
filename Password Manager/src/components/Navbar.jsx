import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white ">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-12">
        <div className="logo font-bold text-2xl">
          <span className="text-green-600">&lt;</span>
          Quick 
          <span className="text-green-600">Pass/&gt;</span>
        </div>

        <ul>
          <li className="flex gap-5">
            <a className="hover:font-bold" href="/">
              Home
            </a>

            <a className="hover:font-bold" href="#">
              About
            </a>

            <a className="hover:font-bold" href="#">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
