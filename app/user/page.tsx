"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ConcertCard from "../components/ConcertCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toast";

interface User {
  id: string;
  email: string;
  name: string;
}

export default function UserPage() {
  const [concerts, setConcerts] = useState<any[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    type: "success" as "success" | "error",
    message: "",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.post("http://localhost:3001/user/login", {
        email: "john.doe@example.com",
      });

      setUser(res.data.user);

      fetchConcerts(res.data.user.id);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchConcerts = async (userId: string) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3001/concerts/${userId}`
      );

      setConcerts(res.data);
    } catch (error) {
      console.error("Error fetching concert:", error);

      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Failed to fetch concert";

      setToast({
        show: true,
        type: "error",
        message: errorMessage,
      });

      setTimeout(() => setToast({
        show: false,
        type: "error",
        message: "",
      }), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async (concertId: string) => {
    if (!user) return;

    try {
      setLoading(true);

      await axios.post("http://localhost:3001/reservations", {
        concertId,
        email: user.email,
      });

      await fetchConcerts(user.id);

      setToast({
        show: true,
        type: "success",
        message: "Reservation successful",
      });

      setTimeout(() => setToast({
        show: false,
        type: "success",
        message: "",
      }), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (reservationId: string) => {
    if (!user) return;

    try {
      setLoading(true);

      await axios.patch(
        `http://localhost:3001/reservations/${reservationId}/cancel`
      );

      await fetchConcerts(user.id);

      setToast({
        show: true,
        type: "error",
        message: "Reservation cancelled",
      });

      setTimeout(() => setToast({
        show: false,
        type: "error",
        message: "",
      }), 3000);
    } finally {
      setLoading(false);
    }
  };

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