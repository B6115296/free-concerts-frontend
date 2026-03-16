"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiLogOut } from "react-icons/fi";
import SidebarNav from "./SidebarNav";

export default function SideBar() {
  const pathname = usePathname();
  const router = useRouter();

  const [mode, setMode] = useState<"admin" | "user">("admin");
  const [open, setOpen] = useState(false);

  const handleModeSwitch = () => {
    const newMode = mode === "admin" ? "user" : "admin";
    setMode(newMode);

    router.push(newMode === "admin" ? "/admin" : "/user");

    setOpen(false);
  };

  const handleLogout = () => {
    handleModeSwitch();
  };

  return (
    <>
      {/* Mobile header */}
      <header className="lg:hidden flex items-center h-[60px] px-4 border-b bg-white fixed top-0 left-0 right-0 z-30">
        <button onClick={() => setOpen(true)}>
          <FiMenu size={28} />
        </button>

        <h2 className="ml-4 text-2xl font-semibold">
          {mode === "admin" ? "Admin" : "User"}
        </h2>
      </header>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static top-0 left-0 z-50
        w-60 h-screen bg-white border-r border-gray-200
        transform transition-transform
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        <div className="flex flex-col h-full py-10">

          <div className="p-6">
            <h2 className="text-[40px] font-semibold">
              {mode === "admin" ? "Admin" : "User"}
            </h2>
          </div>

          <SidebarNav
            mode={mode}
            pathname={pathname}
            onSwitchMode={handleModeSwitch}
            onItemClick={() => setOpen(false)}
          />

          <div className="px-2">
            <button 
              onClick={handleLogout}
              className="text-2xl flex items-center gap-[10px] w-full h-16 px-2 rounded-lg hover:bg-[#EAF5F9] transition-colors"
            >
              <FiLogOut size={24} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}