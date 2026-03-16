import { FiUser } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

interface Concert {
  id: string;
  name: string;
  description: string;
  totalSeats: number;
  availableSeats: number;
  reserved: boolean;
  reservationId?: string;
}

interface ConcertCardProps {
  concert: Concert;
  isAdmin?: boolean;
  onReserve?: (concertId: string) => void;
  onCancel?: (reservationId: string) => void;
  onDelete?: (concertId: string) => void;
}

export default function ConcertCard({
  concert,
  isAdmin = false,
  onReserve,
  onCancel,
  onDelete
}: ConcertCardProps) {

  const isReserved = concert.reserved;
  const isSoldOut = concert.availableSeats === 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-10 max-w-full overflow-hidden">
      <div className="flex flex-col">

        {/* Title */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#1692EC] break-words max-w-full">
          {concert.name}
        </h2>

        {/* Divider */}
        <div className="border-b border-gray-300 my-4 sm:my-6"></div>

        {/* Description */}
        <p className="text-black text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed break-words line-clamp-3">
          {concert.description}
        </p>

        {/* Footer */}
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-between sm:items-center sm:h-[60px]">

          {/* Left Info */}
          <div className="flex items-center gap-2 flex-wrap">

            {!isAdmin && isSoldOut && (
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                Sold Out
              </span>
            )}

            {isAdmin && (
              <span className="text-black text-lg sm:text-xl lg:text-2xl font-medium flex items-center">
                <FiUser className="size-[20px] sm:size-[24px] mr-2" />
                {concert.totalSeats}
              </span>
            )}

          </div>

          {/* Buttons */}
          <div className="w-full sm:w-auto sm:h-full">

            {!isAdmin && (
              <>
                {isSoldOut ? (
                  <button
                    disabled
                    className="sm:text-lg lg:text-2xl w-full sm:w-[160px] sm:h-full bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-not-allowed break-words"
                  >
                    Sold Out
                  </button>
                ) : isReserved ? (
                  <button
                    onClick={() =>
                      concert.reservationId &&
                      onCancel?.(concert.reservationId)
                    }
                    className=" sm:text-lg lg:text-2xl w-full sm:w-[160px] sm:h-full bg-[#E84E4E] text-white px-4 py-2 rounded hover:bg-red-600 transition break-words"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => onReserve?.(concert.id)}
                    className="sm:text-lg lg:text-2xl w-full sm:w-[160px] sm:h-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition break-words"
                  >
                    Reserve
                  </button>
                )}
              </>
            )}

            {isAdmin && (
              <button
                onClick={() => onDelete?.(concert.id)}
                className="sm:text-lg lg:text-2xl w-full sm:w-[160px] sm:h-full bg-[#E84E4E] text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-red-600 transition break-words"
              >
                <RiDeleteBinLine className="size-[20px] sm:size-[24px]" />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}