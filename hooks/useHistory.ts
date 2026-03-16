import { useState, useEffect } from "react";
import api from "../app/utils/api";

interface Reservation {
  id: number;
  username: string;
  concertName: string;
  concertDate: string;
  status: "reserved" | "cancelled";
  createdAt: string;
}

export const useHistory = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchReservations();
  }, []);

  return {
    reservations,
    loading,
    fetchReservations,
  };
};
