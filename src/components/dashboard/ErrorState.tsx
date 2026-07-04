export function ErrorState({ dark = true }: { dark?: boolean }) {
  return (
    <div className={`min-h-screen ${dark ? "bg-[#070B17]" : "bg-gray-50"} flex flex-col items-center justify-center gap-4`}>
      <span className="text-4xl">⚠️</span>
      <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>Failed to load dashboard.</p>
      <button onClick={() => window.location.reload()}
        className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/25">
        Retry
      </button>
    </div>
  );
}
