"use client";

import { useState, useEffect } from "react";
import ConcertCard from "../components/ConcertCard";
import api from "../utils/api";
import StatsBox from "../components/StatsBox";
import { FiAward, FiUser } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

interface Concert {
  id: number;
  name: string;
  description: string;
  totalSeats: number;
  availableSeats: number;
  createdAt: string;
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState("overview");
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSeats: 0,
    reservedSeats: 0,
    cancelledSeats: 0
  });

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await api.get("/admin/concerts");
        setConcerts(response.data);

        // Calculate stats
        const totalSeats = response.data.reduce((sum: number, concert: Concert) => sum + concert.totalSeats, 0);
        const reservedSeats = response.data.reduce((sum: number, concert: Concert) => sum + (concert.totalSeats - concert.availableSeats), 0);
        const cancelledSeats = 0; // This would come from API if available

        setStats({
          totalSeats,
          reservedSeats,
          cancelledSeats
        });
      } catch (error) {
        console.error("Failed to fetch concerts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  const handleDeleteConcert = async (concertId: number) => {
    try {
      await api.delete(`/admin/concerts/${concertId}`);
      setConcerts(concerts.filter(concert => concert.id !== concertId));
    } catch (error) {
      console.error("Failed to delete concert:", error);
    }
  };

  return (
    <div className="flex flex-col h-full px-4 py-6 pt-[76px] sm:px-6 sm:py-10 sm:pt-[76px] lg:px-10 lg:py-16 lg:pt-16 bg-[#FBFBFB]">

      {/* Header */}
      <div className="mb-8 lg:mb-12">
        {/* Stats Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-[35px]">
          <StatsBox
            title="Total of seats"
            value={stats.totalSeats}
            color="blue"
            bgColor="#0070A4"
            icon={<FiUser className="size-[32px] lg:size-[40px] text-white" />}
          />

          <StatsBox
            title="Reserve"
            value={stats.reservedSeats}
            color="green"
            bgColor="#00A58B"
            icon={<FiAward className="size-[32px] lg:size-[40px] text-white" />}
          />

          <StatsBox
            title="Cancel"
            value={stats.cancelledSeats}
            color="red"
            bgColor="#FF6B6B"
            icon={<MdOutlineCancel className="size-[32px] lg:size-[40px] text-white" />}
          />
        </div>
      </div>

      {/* Top Tab Bar */}
      <div className="flex gap-4 sm:gap-6 mb-6 lg:mb-[22px] border-b border-[#C2C2C2] overflow-x-auto">
        <button
          onClick={() => setActiveTab("overview")}
          className={`text-lg sm:text-xl lg:text-2xl py-[10px] px-3 sm:px-4 transition-colors whitespace-nowrap ${activeTab === "overview"
            ? "font-semibold text-[#1692EC] border-b-2 border-[#1692EC]"
            : "font-normal text-[#5C5C5C] hover:text-[#1692EC]"
            }`}
        >
          Overview
        </button>

        <button
          onClick={() => setActiveTab("create")}
          className={`text-lg sm:text-xl lg:text-2xl py-[10px] px-3 sm:px-4 transition-colors whitespace-nowrap ${activeTab === "create"
            ? "font-semibold text-[#1692EC] border-b-2 border-[#1692EC]"
            : "font-normal text-[#5C5C5C] hover:text-[#1692EC]"
            }`}
        >
          Create
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "overview" && (
          <div>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading concerts...</p>
              </div>
            ) : concerts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No concerts found</p>
              </div>
            ) : (
              <div className="space-y-6 lg:space-y-12">
                {concerts.map((concert) => (
                  <ConcertCard
                    key={concert.id}
                    concert={{
                      ...concert,
                      availableSeats: concert.totalSeats,
                      reservedSeats: 0,
                      cancelledSeats: 0
                    }}
                    isAdmin={true}
                    onDelete={handleDeleteConcert}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "create" && (
          <div className="text-xl lg:text-2xl">
            Create
          </div>
        )}
      </div>
    </div>
  );
}