// 'ibelick bg' for tailwind background
// icons from 'lordicon'

import React from "react";

const Manager = () => {
  return (
    <>
      <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-500 opacity-20 blur-[100px]"></div>
      </div>

      <div className="mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-600">&lt;</span>
          Quick
          <span className="text-green-600">Pass&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Password manager
        </p>

        <div className="white flex flex-col p-4 text-black gap-5 items-center">
          <input
            className="rounded-full border border-green-400 w-full p-4 py-1"
            type="text"
            placeholder="Enter Website URL"
          />

          <div className="flex w-full justify-between gap-10">
            <input
              className="rounded-full border border-green-400 w-full p-4 py-1"
              type="text"
              placeholder="Enter Username"
            />

            <div className="relative">
              <input
                className="rounded-full border border-green-400 w-full p-4 py-1"
                type="text"
                placeholder="Enter Password"
              />
              <span className="absolute right-0">show</span>
            </div>
          </div>
          <button className="flex justify-center items-center gap-2 bg-green-600 rounded-full p-2 w-fit hover:bg-green-700 text-white">
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
      </div>
    </>
  );
};

export default Manager;
