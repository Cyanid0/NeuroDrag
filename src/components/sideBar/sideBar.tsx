import React from "react";

function SideBar({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) {
  return (
    <div className={`sticky top-0 transition-all ease-in-out duration-500 ${isOpen ? "w-[25%]" : "w-0"}`}>
      <aside className={`flex flex-col pt-10 border-r-2 h-screen items-center`}>
        <h1 className="text-4xl font-bold mb-24">NeuroDrag</h1>
        <div className="flex flex-col items-center gap-5 text-2xl w-[90%]">
          {children}
        </div>
      </aside>
    </div>
  );
}

export default SideBar;
