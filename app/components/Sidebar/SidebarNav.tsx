import { FiHome } from "react-icons/fi";
import { BsInbox } from "react-icons/bs";
import { PiUserSwitch } from "react-icons/pi";
import SidebarItem from "./SidebarItem";

export default function SidebarNav({
  mode,
  pathname,
  onSwitchMode,
  onItemClick
}: {
  mode: "admin" | "user";
  pathname: string;
  onSwitchMode: () => void;
  onItemClick?: () => void;
}) {
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="flex-1 space-y-2 px-2">
      {mode === "admin" ? (
        <>
          <SidebarItem
            href="/admin"
            icon={FiHome}
            label="Home"
            active={isActive("/admin")}
            onClick={onItemClick}
          />

          <SidebarItem
            href="/admin/history"
            icon={BsInbox}
            label="History"
            active={isActive("/admin/history")}
            onClick={onItemClick}
          />

          <SidebarItem
            icon={PiUserSwitch}
            label="Switch to User"
            onClick={onSwitchMode}
          />
        </>
      ) : (
        <SidebarItem
          icon={PiUserSwitch}
          label="Switch to Admin"
          onClick={onSwitchMode}
        />
      )}
    </nav>
  );
}