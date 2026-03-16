import Link from "next/link";

export default function SidebarItem({
  href,
  icon: Icon,
  label,
  active,
  onClick
}: {
  href?: string;
  icon: any;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  const base =
    "text-2xl flex items-center gap-[10px] h-16 px-2 rounded-lg transition-colors";

  if (href) {
    return (
      <Link
        href={href}
        className={`${base} ${
          active ? "bg-[#EAF5F9]" : "hover:bg-[#EAF5F9]"
        }`}
        onClick={onClick}
      >
        <Icon size={24} />
        {label}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${base} w-full text-left hover:bg-[#EAF5F9]`}
    >
      <Icon size={22} />
      {label}
    </button>
  );
}