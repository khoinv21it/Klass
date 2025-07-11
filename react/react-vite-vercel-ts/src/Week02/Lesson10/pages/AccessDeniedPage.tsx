
type Props = {};

export default function AccessDeniedPage({}: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center">
        <svg
          className="w-16 h-16 text-red-500 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <line
            x1="8"
            y1="8"
            x2="16"
            y2="16"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="16"
            y1="8"
            x2="8"
            y2="16"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <h1 className="text-3xl font-bold text-red-600 mb-2">Access Denied</h1>
        <p className="text-gray-600 text-lg">
          You do not have permission to view this page.
        </p>
      </div>
    </div>
  );
}
