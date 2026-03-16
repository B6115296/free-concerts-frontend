"use client";

import { useState, useEffect } from "react";
import api from "../utils/api";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

interface Reservation {
  id: number;
  username: string;
  concertName: string;
  concertDate: string;
  status: "reserved" | "cancelled";
  createdAt: string;
}

export default function HistoryTable() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const headerClass =
    "h-[40px] md:h-[50px] px-[8px] md:px-[12px] py-[6px] md:py-[10px] text-[14px] md:text-[20px] text-black font-medium text-left border-r border-[#5B5B5B]";

  const cellClass =
    "h-[36px] md:h-[44px] px-[8px] md:px-[12px] py-[6px] md:py-[10px] text-[12px] md:text-[14px] text-black whitespace-nowrap border-r border-[#5B5B5B]";

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await api.get("/reservation-history");
        setReservations(response.data);
      } catch (error) {
        console.error("Failed to fetch reservation history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return (
      <div className={`${inter.className} flex items-center justify-center py-8`}>
        <div className="text-gray-600">Loading reservation history...</div>
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <div className={`${inter.className} flex items-center justify-center py-8`}>
        <div className="text-gray-600">No reservation history found</div>
      </div>
    );
  }

  return (
    <div className={`${inter.className} w-full overflow-x-auto`}>
      <table className="w-full bg-transparent border border-[#5B5B5B] border-collapse">
        <thead>
          <tr className="border-b border-[#5B5B5B]">
            <th className={headerClass}>Date Time</th>
            <th className={headerClass}>Username</th>
            <th className={headerClass}>Concert Name</th>
            <th className={headerClass}>Action</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id} className="border-b border-[#5B5B5B]">
              <td className={cellClass}>
                {new Date(reservation.createdAt).toLocaleString()}
              </td>

              <td className={cellClass}>{reservation.username}</td>

              <td className={cellClass}>{reservation.concertName}</td>

              <td className={cellClass}>{reservation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}