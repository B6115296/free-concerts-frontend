"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FiHome, FiLogOut } from "react-icons/fi";
import { BsInbox } from "react-icons/bs";
import { PiUserSwitch } from "react-icons/pi";

export default function SideBar() {
  const pathname = usePathname();
  const [mode, setMode] = useState<"admin" | "user">("admin");
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const handleModeSwitch = () => {
    const newMode = mode === "admin" ? "user" : "admin";
    setMode(newMode);

    // Navigate to appropriate page based on new mode
    if (newMode === "user") {
      router.push("/");
    } else {
      router.push("/admin");
    }
  };

  return (
    <aside className="w-60 h-screen bg-white text-black border-r border-gray-200">
      <div className="flex flex-col h-full py-10">
        {/* Header */}
        <div className="p-6">
          <h2 className="text-[40px] font-semibold">{mode === "admin" ? "Admin" : "User"}</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 ">
          {mode === "admin" ? (
            <>
              <div className="px-2">
                <Link
                  href="/admin"
                  className={`text-2xl font-normal flex items-center gap-[10px] px-2 py-3 rounded-lg transition-colors ${isActive("/admin") ? "bg-[#EAF5F9]" : "hover:bg-[#EAF5F9]"
                    }`}
                >
                  <FiHome size="24px" />
                  Home
                </Link>
              </div>

              <div className="px-2">
                <Link
                  href="/admin/history"
                  className={`text-2xl font-normal flex items-center gap-[10px] px-2 py-3 rounded-lg transition-colors ${isActive("/admin/history") ? "bg-[#EAF5F9]" : "hover:bg-[#EAF5F9]"
                    }`}
                >
                  <BsInbox size="24px" />
                  History
                </Link>
              </div>

              <div className="px-2">
                <button
                  onClick={handleModeSwitch}
                  className="text-2xl font-normal flex items-center gap-[10px] w-full px-2 py-3 text-left rounded-lg transition-colors hover:bg-[#EAF5F9]"
                >
                  <PiUserSwitch size="24px" />
                  Switch to User
                </button>
              </div>
            </>
          ) : (
            <div className="px-2">
              <button
                onClick={handleModeSwitch}
                className="text-2xl font-normal flex items-center gap-[10px] w-full px-2 py-3 text-left rounded-lg transition-colors hover:bg-[#EAF5F9]"
              >
                <PiUserSwitch size="24px" />
                Switch to Admin
              </button>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div className="px-2">
          <button className="text-2xl font-normal flex items-center gap-[10px] w-full px-2 py-3 text-left rounded-lg hover:bg-[#EAF5F9] transition-colors">
            <FiLogOut size="24px" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}