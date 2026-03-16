import React from "react";
import { FiSave, FiUsers } from "react-icons/fi";

interface ConcertFormData {
  concertName: string;
  totalSeats: string;
  description: string;
}

interface ConcertFormProps {
  formData: ConcertFormData;
  errors: Partial<Record<keyof ConcertFormData, string>>;
  loading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
}

export default function ConcertForm({
  formData,
  errors,
  loading,
  onInputChange,
  onSave
}: ConcertFormProps) {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-10">

        <div className="space-y-6">

          {/* Title */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#1692EC]">
            Create
          </h2>

          {/* Divider */}
          <div className="border-b border-gray-300"></div>

          {/* Row: Concert Name + Total Seats */}
          <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">

            {/* Concert Name */}
            <div className="flex flex-col">
              <label className="text-[24px] max-sm:text-lg font-medium text-black mb-4">
                Concert Name
              </label>

              <input
                type="text"
                name="concertName"
                value={formData.concertName}
                onChange={onInputChange}
                placeholder="Please input concert name"
                className={`h-[48px] px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.concertName ? "border-red-500" : "border-gray-300"
                  }`}
              />

              {errors.concertName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.concertName}
                </p>
              )}
            </div>

            {/* Total Seats */}
            <div className="flex flex-col">
              <label className="text-[24px] max-sm:text-lg font-medium text-black mb-4">
                Total of Seats
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  name="totalSeats"
                  value={formData.totalSeats}
                  onChange={onInputChange}
                  placeholder="Please input total of seats"
                  className={`h-[48px] w-full px-4 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.totalSeats ? "border-red-500" : "border-gray-300"
                    }`}
                />

                <FiUsers className="absolute right-3 top-1/2 -translate-y-1/2 text-black text-[20px] pointer-events-none" />
              </div>

              {errors.totalSeats && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.totalSeats}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-[24px] max-sm:text-lg font-medium text-black mb-4">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={onInputChange}
              placeholder="Please input description"
              className={`h-[102px] px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.description ? "border-red-500" : "border-gray-300"
                }`}
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description}
              </p>
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={onSave}
              disabled={loading}
              className="flex items-center justify-center gap-2 w-[160px] max-sm:w-full h-[60px] bg-[#1692EC] text-white text-lg font-medium rounded-lg hover:bg-[#1692EC]/80 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {!loading && <FiSave className="text-[22px]" />}
              {loading ? "Saving..." : "Save"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}