// 'ibelick bg' for tailwind background

import React from "react";

const Manager = () => {
  return (
    <>
      <div class="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>

      <div className="container mx-auto bg-slate-500">
        <div className="white flex flex-col p-4">
          <input type="text" />
          <div className="flex">
            <input type="text" />
            <input type="text" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
