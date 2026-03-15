import React from "react";

interface StatsBoxProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: "blue" | "green" | "red";
  bgColor: "#0070A4" | "#00A58B" | "#FF6B6B";
}

export default function StatsBox({
  title,
  value,
  icon,
  bgColor,
}: StatsBoxProps) {
  return (
    <div
      className="
      rounded-lg border border-gray-200 shadow-sm
      h-[140px] sm:h-[180px] lg:h-[234px]
      p-4 sm:p-6
      flex items-center justify-center
      "
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex flex-col items-center gap-2 sm:gap-3">
        <div className="text-white text-[28px] sm:text-[32px] lg:text-[40px]">
          {icon}
        </div>

        <p className="text-base sm:text-lg lg:text-2xl font-medium text-white text-center">
          {title}
        </p>

        <p className="text-3xl sm:text-4xl lg:text-6xl font-medium text-white">
          {value.toLocaleString()}
        </p>
      </div>
    </div>
  );
}