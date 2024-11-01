// background from 'ibelick bg'
// icons from 'lordicon'
// popup from 'react-toastify'
// unique id from 'uuid'

import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

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
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      // Changing the type of password from visible to invisibe
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      // Changing the type of password from invisible to visibe
      passwordRef.current.type = "text";
    }
  };

  // To get input from the input fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Copying the details to clipboard
  const copyText = (text) => {
    navigator.clipboard.writeText(text);

    // Displaying popup
    toast("Copied to clipboard");
  };

  const savePassword = () => {
    console.log(form);

    // Spreading passwordArray, then spreading form to add new elements
    setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );

    // Saved popup
    toast("Password saved");

    // clearing the form after saving
    setForm({site:"",username:"",password:""})
  };

  // Deleting password
  const deletePassword = (id) => {
    let option = confirm("Delete password?");
    if (option === true) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );

      // Deleted popup
      toast("Password deleted successfully");
    }
  };

  // Editing password
  const editPassword = (id) => {
    // Populating the fields
    setForm(passwordArray.filter((item) => item.id === id)[0]);

    // Deleting existing data
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  // ACTUAL WEBSITE STARTS
  return (
    <>
    <ToastContainer/>

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
                ref={passwordRef}
                type="password"
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
            Save Password
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
                  <th className="py-2">Action</th>
                </tr>
              </thead>

              {/* Table body */}
              <tbody className="text-center bg-green-100">
                {/* {passwordArray.map((item) => (
                  <tr>
                    <td className="py-2 border border-white">{item.site}</td>
                    <td className="py-2 border border-white">
                      {item.username}
                    </td>
                    <td className="py-2 border border-white">{item.password}</td>
                  </tr>
                ))} */}

                {/* Another way */}
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white">
                        <div className="flex justify-center items-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>

                          {/* Copy button */}
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                            ></lord-icon>
                          </span>
                        </div>
                      </td>

                      <td className="py-2 border border-white">
                        <div className="flex justify-center items-center">
                          {item.username}

                          {/* Copy button */}
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                            ></lord-icon>
                          </span>
                        </div>
                      </td>

                      <td className="py-2 border border-white">
                        <div className="flex justify-center items-center">
                          {item.password}

                          {/* Copy button */}
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/lyrrgrsl.json"
                              trigger="hover"
                            ></lord-icon>
                          </span>
                        </div>
                      </td>

                      {/* Delete and Edit buttons */}
                      <td className="py-2 border border-white">
                        <span
                          className="cursor-pointer mx-2"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            stroke="bold"
                            state="hover-line"
                          ></lord-icon>
                        </span>

                        <span
                          className="cursor-pointer mx-2"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/wpyrrmcq.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
