export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-pool-50 border-t-pool-500 rounded-full animate-spin"></div>
        </div>

        {/* Loading text */}
        <p className="text-pool-900 font-semibold text-lg">
          Loading...
        </p>
      </div>
    </div>
  );
}
