import { FiUser } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import "./../styles/concert-card.css";

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
    <div className="card-custom bg-white border border-gray-200 p-4 sm:p-6 lg:p-10 max-w-full overflow-hidden">
      <div className="flex flex-col">

        {/* Title */}
        <h2 className="card-title">
          {concert.name}
        </h2>

        {/* Divider */}
        <div className="card-divider"></div>

        {/* Description */}
        <p className="card-description">
          {concert.description}
        </p>

        {/* Footer */}
        <div className="card-footer">

          {/* Left Info */}
          <div className="card-left-info">

            {!isAdmin && isSoldOut && (
              <span className="sold-out-badge">
                Sold Out
              </span>
            )}

            {isAdmin && (
              <span className="admin-seats-info">
                <FiUser className="admin-seats-icon" />
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
                    className="reserve-btn w-full sm:w-[160px] sm:h-full bg-gray-300 text-gray-600 cursor-not-allowed"
                  >
                    Sold Out
                  </button>
                ) : isReserved ? (
                  <button
                    onClick={() =>
                      concert.reservationId &&
                      onCancel?.(concert.reservationId)
                    }
                    className="cancel-btn w-full sm:w-[160px] sm:h-full"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => onReserve?.(concert.id)}
                    className="reserve-btn w-full sm:w-[160px] sm:h-full"
                  >
                    Reserve
                  </button>
                )}
              </>
            )}

            {isAdmin && (
              <button
                onClick={() => onDelete?.(concert.id)}
                className="delete-btn w-full sm:w-[160px] sm:h-full"
              >
                <RiDeleteBinLine className="delete-icon" />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}