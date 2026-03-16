interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="text-gray-600">{message}</div>
    </div>
  );
}
