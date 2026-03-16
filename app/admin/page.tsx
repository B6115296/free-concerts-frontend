"use client";

import ConcertCard from "../components/ConcertCard";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import StatsBox from "../components/StatsBox";
import LoadingSpinner from "../components/LoadingSpinner";
import ConcertForm from "../components/ConcertForm";
import { useAdminConcerts } from "../../hooks/useAdminConcerts";

import { FiAward, FiUser } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

export default function Admin() {
  const {
    activeTab,
    setActiveTab,
    concerts,
    loading,
    stats,
    formData,
    errors,
    showModal,
    selectedConcert,
    toast,
    handleInputChange,
    validateForm,
    handleSave,
    handleDelete,
    handleDeleteClick,
    closeModal,
  } = useAdminConcerts();

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
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "create" && (
          <ConcertForm
            formData={formData}
            errors={errors}
            loading={loading}
            onInputChange={handleInputChange}
            onSave={handleSave}
          />
        )}
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        show={showModal}
        concertName={selectedConcert?.name || ""}
        onCancel={closeModal}
        onConfirm={() => {
          if (selectedConcert) {
            handleDelete(selectedConcert.id.toString());
          }
          closeModal();
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
