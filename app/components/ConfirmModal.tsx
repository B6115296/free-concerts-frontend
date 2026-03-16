import { MdCancel } from "react-icons/md";

interface ConfirmModalProps {
    show: boolean;
    concertName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({
    show,
    concertName,
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-[#00000066] flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 sm:p-8 text-center">
                <MdCancel className="text-5xl sm:text-6xl text-red-500 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                    Are you sure to delete?
                </h3>

                <p className="text-gray-600 mb-6 break-words max-w-full">
                    "{concertName}"
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition break-words"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2 bg-[#E63946] text-white hover:bg-red-700 rounded-lg font-medium transition break-words"
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
}