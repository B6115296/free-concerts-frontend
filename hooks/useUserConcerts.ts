import { useEffect, useState } from "react";
import api from "../app/utils/api";

interface User {
  id: string;
  email: string;
  name: string;
}

export const useUserConcerts = () => {
  const [concerts, setConcerts] = useState<any[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    type: "success" as "success" | "error",
    message: "",
  });

  const fetchUser = async () => {
    try {
      const res = await api.post("/user/login", {
        email: process.env.NEXT_PUBLIC_DEFAULT_USER_EMAIL,
      });

      setUser(res.data.user);
      await fetchConcerts(res.data.user.id);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchConcerts = async (userId: string) => {
    try {
      setLoading(true);
      const res = await api.get(`/concerts/${userId}`);
      setConcerts(res.data);
    } catch (error) {
      console.error("Error fetching concerts:", error);
      const errorMessage =
        error instanceof Error && (error as any).response?.data?.message
          ? (error as any).response.data.message
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
      await api.post("/reservations", {
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
      await api.patch(`/reservations/${reservationId}/cancel`);
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

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    concerts,
    setConcerts,
    user,
    setUser,
    loading,
    setLoading,
    toast,
    setToast,
    fetchUser,
    fetchConcerts,
    handleReserve,
    handleCancel,
  };
};
