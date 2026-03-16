"use client";

import { useState, useEffect } from "react";
import HistoryTable from "../../components/HistoryTable";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function History() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 p-4 sm:p-6 lg:p-10 pt-[76px] sm:pt-[76px] lg:pt-16 bg-[#FBFBFB] overflow-y-auto">
          <LoadingSpinner message="Loading reservation history..." />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4 sm:p-6 lg:p-10 pt-[76px] sm:pt-[76px] lg:pt-16 bg-[#FBFBFB] overflow-y-auto">
        <div className="max-w-full">
          <HistoryTable />
        </div>
      </div>
    </div>
  );
}