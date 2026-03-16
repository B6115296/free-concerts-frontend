import { useState, useEffect } from "react";
import api from "../app/utils/api";
import { z, ZodError } from "zod";

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

interface ConcertFormData {
  concertName: string;
  totalSeats: string;
  description: string;
}

const concertSchema = z.object({
  concertName: z.string()
    .min(1, "Concert name is required")
    .min(3, "Concert name must be at least 3 characters")
    .max(100, "Concert name cannot exceed 100 characters")
    .trim(),
  totalSeats: z.string()
    .min(1, "Total seats is required")
    .regex(/^\d+$/, "Total seats must be a valid number")
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: "Total seats must be greater than 0"
    })
    .refine((val) => val <= 100000, {
      message: "Total seats cannot exceed 100,000"
    }),
  description: z.string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters")
    .trim()
});

export const useAdminConcerts = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<SeatSummary>({
    totalSeats: 0,
    reservedSeats: 0,
    cancelledSeats: 0,
  });
  const [formData, setFormData] = useState<ConcertFormData>({
    concertName: "",
    totalSeats: "",
    description: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ConcertFormData, string>>>({});
  const [showModal, setShowModal] = useState(false);
  const [selectedConcert, setSelectedConcert] = useState<Concert | null>(null);
  const [toast, setToast] = useState({
    show: false,
    type: "success" as "success" | "error",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    try {
      concertSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Partial<Record<keyof ConcertFormData, string>> = {};
        error.issues.forEach((err) => {
          if (err.path.length > 0) {
            fieldErrors[err.path[0] as keyof ConcertFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

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

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const concertData = {
        name: formData.concertName,
        totalSeats: parseInt(formData.totalSeats),
        description: formData.description,
      };

      await api.post("/admin/concerts", concertData);

      setToast({
        show: true,
        type: "success",
        message: "Concert created successfully!",
      });
      setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);

      setFormData({
        concertName: "",
        totalSeats: "",
        description: "",
      });

      try {
        const concertsRes = await api.get("/admin/concerts");
        const statsRes = await api.get("/admin/concerts/seats-summary");
        setConcerts(concertsRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error("Failed to refresh data:", error);
      }

      setActiveTab("overview");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred while creating the concert";
      setToast({
        show: true,
        type: "error",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (concertId: string) => {
    const found = concerts.find((c) => c.id.toString() === concertId);
    if (found) {
      setSelectedConcert(found);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedConcert(null);
  };

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

  return {
    activeTab,
    setActiveTab,
    concerts,
    setConcerts,
    loading,
    setLoading,
    stats,
    setStats,
    formData,
    setFormData,
    errors,
    setErrors,
    showModal,
    setShowModal,
    selectedConcert,
    setSelectedConcert,
    toast,
    setToast,
    handleInputChange,
    validateForm,
    handleSave,
    handleDelete,
    handleDeleteClick,
    closeModal,
  };
};
