"use client";

import { useState, useEffect } from "react";
import ConcertCard from "../components/ConcertCard";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import StatsBox from "../components/StatsBox";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../utils/api";

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

interface SeatSummary {
  totalSeats: number;
  reservedSeats: number;
  cancelledSeats: number;
}

export default function Admin() {

  const [activeTab, setActiveTab] = useState("overview");
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<SeatSummary>({
    totalSeats: 0,
    reservedSeats: 0,
    cancelledSeats: 0,
  });

  const [toast, setToast] = useState({
    show: false,
    type: "success" as "success" | "error",
    message: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const concertsRes = await api.get("/admin/concerts");
        const statsRes = await api.get("/admin/concerts/seats-summary");

        setConcerts(concertsRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // delete concert
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/admin/concerts/${id}`);

      setConcerts((prev) =>
        prev.filter((concert) => concert.id.toString() !== id)
      );

      setToast({
        show: true,
        type: "success",
        message: "Concert deleted successfully",
      });

    } catch (error) {

      setToast({
        show: true,
        type: "error",
        message: "Failed to delete concert",
      });
    }

    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  return (
    <div className="flex flex-col h-full px-4 py-6 pt-[64px] bg-[#FBFBFB]">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

        <StatsBox
          title="Total of seats"
          value={stats.totalSeats}
          color="blue"
          bgColor="#0070A4"
          icon={<FiUser className="size-[32px] text-white" />}
        />

        <StatsBox
          title="Reserve"
          value={stats.reservedSeats}
          color="green"
          bgColor="#00A58B"
          icon={<FiAward className="size-[32px] text-white" />}
        />

        <StatsBox
          title="Cancel"
          value={stats.cancelledSeats}
          color="red"
          bgColor="#FF6B6B"
          icon={<MdOutlineCancel className="size-[32px] text-white" />}
        />

      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-6 border-b border-[#C2C2C2]">

        <button
          onClick={() => setActiveTab("overview")}
          className={
            activeTab === "overview"
              ? "font-semibold text-[#1692EC] border-b-2 border-[#1692EC] py-[10px]"
              : "text-[#5C5C5C] py-[10px]"
          }
        >
          Overview
        </button>

        <button
          onClick={() => setActiveTab("create")}
          className={
            activeTab === "create"
              ? "font-semibold text-[#1692EC] border-b-2 border-[#1692EC] py-[10px]"
              : "text-[#5C5C5C] py-[10px]"
          }
        >
          Create
        </button>

      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "overview" && (
          <div>
            {loading ? (
              <LoadingSpinner message="Loading concerts..." />
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
                      id: concert.id.toString(),
                      name: concert.name,
                      description: concert.description,
                      totalSeats: concert.totalSeats,
                      availableSeats: concert.availableSeats,
                      reserved: false,
                    }}
                    isAdmin={true}
                    onDelete={(concertId) => {

                      const found = concerts.find(
                        (c) => c.id.toString() === concertId
                      );

                      if (found) {
                        setSelectedConcert(found);
                        setShowModal(true);
                      }

                    }}
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

      {/* Confirm Delete Modal */}
      <ConfirmModal
        show={showModal}
        concertName={selectedConcert?.name || ""}
        onCancel={() => setShowModal(false)}
        onConfirm={() => {
          if (selectedConcert) {
            handleDelete(selectedConcert.id.toString());
          }
          setShowModal(false);
        }}
      />

      {/* Toast */}
      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
      />

    </div>
  );
}