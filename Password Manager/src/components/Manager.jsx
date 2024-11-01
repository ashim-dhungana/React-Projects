// 'ibelick bg' for tailwind background
// icons from 'lordicon'

import React from "react";
import { useRef, useState, useEffect } from "react";

const Manager = () => {
  const ref = useRef();

  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  // To toggle show and hide password
  const showPassword = () => {
    alert("Show the password");
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
    } else {
      ref.current.src = "icons/eyecross.png";
    }
  };

  // To get input from the input fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = () => {
    console.log(form);
    setPasswordArray([...passwordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    console.log([...passwordArray, form]);
  };

  return (
    <>
      {/* background gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-500 opacity-20 blur-[100px]"></div>
      </div>

      {/* main container */}
      <div className="mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-600">&lt;</span>
          Quick
          <span className="text-green-600">Pass&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Password manager
        </p>

        {/* div that takes input */}
        <div className="white flex flex-col p-4 text-black gap-5 items-center">
          <input
            className="rounded-full border border-green-400 w-full p-4 py-1"
            type="text"
            name="site"
            placeholder="Enter Website URL"
            onChange={handleChange}
            value={form.site}
          />

          {/* inner div for username & password */}
          <div className="flex w-full justify-between gap-10">
            <input
              className="rounded-full border border-green-400 w-full p-4 py-1"
              type="text"
              name="username"
              placeholder="Enter Username"
              onChange={handleChange}
              value={form.username}
            />

            {/* for password and eye icon */}
            <div className="relative">
              <input
                className="rounded-full border border-green-400 w-full p-4 py-1"
                type="text"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
                value={form.password}
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={30}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-600 rounded-full p-2 w-fit hover:bg-green-700 text-white"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        {/* Table for showing passwords */}
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>

          {passwordArray.length === 0 && <div>No passwords to show</div>}

          {passwordArray.length != 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md">
              <thead className="bg-green-600">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                </tr>
              </thead>

              {/* Table body */}
              <tbody className="text-center bg-green-100">
                <tr>
                  <td className="py-2 border border-white">
                    The Sliding Mr. Bones (Next Stop, Pottersville)
                  </td>
                  <td className="py-2 border border-white">Malcolm Lockyer</td>
                  <td className="py-2 border border-white">1961</td>
                </tr>
                <tr>
                  <td className="py-2 border border-white">Witchy Woman</td>
                  <td className="py-2 border border-white">The Eagles</td>
                  <td className="py-2 border border-white">1972</td>
                </tr>
                <tr>
                  <td className="py-2 border border-white">Shining Star</td>
                  <td className="py-2 border border-white">
                    Earth, Wind, and Fire
                  </td>
                  <td className="py-2 border border-white">1975</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
