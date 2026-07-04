export function EmptyState({ icon = "📭", message = "Nothing here yet", dark = true }: { icon?: string; message?: string; dark?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <span className="text-3xl mb-2">{icon}</span>
      <p className={`text-sm ${dark ? "text-gray-500" : "text-gray-400"}`}>{message}</p>
    </div>
  );
}
