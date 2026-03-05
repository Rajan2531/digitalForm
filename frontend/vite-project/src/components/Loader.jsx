export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-xl bg-white px-10 py-8 shadow-2xl">
        
        {/* Neutral Shield + Spinner */}
        <div className="relative">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-5 w-5 rounded bg-slate-900" />
          </div>
        </div>

        {/* Safe Text */}
        <p className="text-sm font-semibold tracking-wide text-slate-800">
          Loading complaint details
        </p>

        <p className="text-xs text-gray-500">
          Cyber Crime Monitoring System
        </p>
      </div>
    </div>
  );
}
