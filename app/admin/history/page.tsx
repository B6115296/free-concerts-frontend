"use client";

import HistoryTable from "../../components/HistoryTable";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useHistory } from "../../../hooks/useHistory";

export default function HistoryPage() {
  const { loading } = useHistory();

  return (
    <div className="flex flex-col h-full px-4 py-6 pt-[64px] bg-[#FBFBFB]">
      <div className="flex-1 overflow-auto">
        {loading ? (
          <LoadingSpinner message="Loading history..." />
        ) : (
          <HistoryTable />
        )}
      </div>
    </div>
  );
}
