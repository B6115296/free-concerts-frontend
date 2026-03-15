import React from "react";
import { FiUser } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

interface Concert {
  id: number;
  name: string;
  totalSeats: number;
  availableSeats: number;
  reservedSeats: number;
  cancelledSeats: number;
  description: string;
}

interface ConcertCardProps {
  concert: Concert;
  userStatus?: "reserved" | "cancelled" | null;
  canReserve?: boolean;
  canCancel?: boolean;
  isAdmin?: boolean;
  onReserve?: (concertId: number) => void;
  onCancel?: (concertId: number) => void;
  onDelete?: (concertId: number) => void;
}

export default function ConcertCard({
  concert,
  userStatus = null,
  canReserve = false,
  canCancel = false,
  isAdmin = false,
  onReserve,
  onCancel,
  onDelete
}: ConcertCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-10">
      <div className="flex flex-col">

        {/* Title */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#1692EC]">
          {concert.name}
        </h2>

        {/* Seat info (User View) */}
        {!isAdmin && (
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">
                Total Seats:
              </span>
              <span className="text-sm font-bold text-gray-900">
                {concert.totalSeats}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">
                Available:
              </span>
              <span
                className={`text-sm font-bold ${concert.availableSeats > 0
                    ? "text-green-600"
                    : "text-red-600"
                  }`}
              >
                {concert.availableSeats}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">
                Reserved:
              </span>
              <span className="text-sm font-bold text-blue-600">
                {concert.reservedSeats}
              </span>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-b border-gray-300 my-4 sm:my-6"></div>

        {/* Description */}
        <p className="text-black text-base sm:text-lg lg:text-2xl mb-6 sm:mb-8 leading-relaxed">
          {concert.description}
        </p>

        {/* Footer */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">

          {/* Left Info */}
          <div className="flex items-center gap-2 flex-wrap">

            {/* User status */}
            {!isAdmin && userStatus && (
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${userStatus === "reserved"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                  }`}
              >
                {userStatus === "reserved" ? "Reserved" : "Cancelled"}
              </span>
            )}

            {/* Sold out */}
            {!isAdmin && concert.availableSeats === 0 && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                Sold Out
              </span>
            )}

            {/* Admin seat display */}
            {isAdmin && (
              <span className="text-black text-lg sm:text-xl lg:text-2xl font-medium flex items-center">
                <FiUser className="size-[20px] sm:size-[24px] mr-2" />
                {concert.totalSeats}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">

            {!isAdmin && canReserve && onReserve && (
              <button
                onClick={() => onReserve(concert.id)}
                className="w-full sm:w-[160px] h-[48px] sm:h-[60px] bg-green-600 text-white font-medium rounded hover:bg-green-700 transition-colors"
              >
                Reserve
              </button>
            )}

            {!isAdmin && canCancel && onCancel && (
              <button
                onClick={() => onCancel(concert.id)}
                className="w-full sm:w-[160px] h-[48px] sm:h-[60px] bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors"
              >
                Cancel
              </button>
            )}

            {isAdmin && onDelete && (
              <button
                onClick={() => onDelete(concert.id)}
                className="w-full sm:w-[160px] h-[48px] sm:h-[60px] bg-[#E84E4E] text-white font-medium rounded hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <RiDeleteBinLine className="size-[20px] sm:size-[24px]" />
                <span className="text-base sm:text-lg lg:text-2xl">
                  Delete
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}