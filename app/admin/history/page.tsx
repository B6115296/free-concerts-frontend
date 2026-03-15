"use client";

import HistoryTable from "../../components/HistoryTable";

export default function History() {
  return (
    <div className="px-4 py-6 pt-[76px] sm:px-6 sm:py-10 sm:pt-[76px] lg:px-10 lg:py-16 lg:pt-16 bg-[#FBFBFB] h-full">
      <div className="flex-1 overflow-hidden">
        <HistoryTable />
      </div>
    </div>
  );
}