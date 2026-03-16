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
      h-[100px] sm:h-[160px] lg:h-[234px]
      p-3 sm:p-5 lg:p-6
      flex items-center justify-center
      "
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex flex-col items-center gap-1 sm:gap-3">

        <div className="text-white text-[22px] sm:text-[30px] lg:text-[40px]">
          {icon}
        </div>

        <p className="text-sm sm:text-lg lg:text-2xl font-medium text-white text-center">
          {title}
        </p>

        <p className="text-2xl sm:text-4xl lg:text-6xl font-medium text-white">
          {value.toLocaleString()}
        </p>

      </div>
    </div>
  );
}