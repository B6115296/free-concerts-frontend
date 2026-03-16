import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

interface ToastProps {
  show: boolean;
  type: "success" | "error";
  message: string;
}

export default function Toast({ show, type, message }: ToastProps) {
  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 transition-all duration-300">
      <div
        className={`px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 ${type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
      >
        {type === "success" ? (
          <FaRegCheckCircle className="size-[20px]" />
        ) : (
          <FaRegTimesCircle className="size-[20px]" />
        )}

        {message}
      </div>
    </div>
  );
}