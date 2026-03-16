"use client";

import ConcertCard from "../components/ConcertCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast";
import { useUserConcerts } from "../../hooks/useUserConcerts";

export default function UserPage() {
  const {
    concerts,
    user,
    loading,
    toast,
    handleReserve,
    handleCancel,
  } = useUserConcerts();

  return (
    <div className="flex flex-col h-screen">

      <div className="flex-1 overflow-auto p-4 md:p-6">
        {loading ? (
          <LoadingSpinner message="Loading concerts..." />
        ) : concerts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No concerts available.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:gap-6">
            {concerts.map((concert) => (
              <ConcertCard
                key={concert.id}
                concert={concert}
                onReserve={() => handleReserve(concert.id)}
                onCancel={() => handleCancel(concert.reservationId)}
              />
            ))}
          </div>
        )}
      </div>
      {/* Toast */}

      <Toast
        show={toast?.show}
        type={toast?.type}
        message={toast?.message}
      />
    </div>
  );
}
