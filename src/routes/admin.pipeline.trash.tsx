import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Trash2,
  RotateCcw,
  AlertTriangle,
  RefreshCw,
  Search,
  Clock,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  FileText
} from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { apiFetch } from "~/lib/apiFetch";

export const Route = createFileRoute("/admin/pipeline/trash")({
  component: AdminPipelineTrashPage,
});

interface TrashItem {
  _id: string;
  title: string;
  lessonId: string;
  level: string;
  originalType: "draft" | "published";
  deletedAt: string;
  expiresAt: string;
  deletedBy: string;
  daysRemaining: number;
}

export function AdminPipelineTrashPage() {
  const { dark } = useTheme();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [showEmptyModal, setShowEmptyModal] = useState(false);
  const [showPermanentModal, setShowPermanentModal] = useState<string | null>(null);

  const { data: trashItems = [], isLoading, refetch } = useQuery<TrashItem[]>({
    queryKey: ["admin-pipeline-trash"],
    queryFn: async () => {
      const res = await apiFetch("/admin/content-pipeline/trash");
      const json = await res.json();
      return json.data || [];
    },
  });

  const restoreMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/admin/content-pipeline/trash/${id}/restore`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to restore item");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pipeline-trash"] });
      queryClient.invalidateQueries({ queryKey: ["admin-pipeline-drafts"] });
      queryClient.invalidateQueries({ queryKey: ["admin-pipeline-published"] });
    },
  });

  const permanentDeleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiFetch(`/admin/content-pipeline/trash/${id}/permanent`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete item permanently");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pipeline-trash"] });
      setShowPermanentModal(null);
    },
  });

  const emptyTrashMutation = useMutation({
    mutationFn: async () => {
      const res = await apiFetch("/admin/content-pipeline/trash/empty", {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to empty recycle bin");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-pipeline-trash"] });
      setShowEmptyModal(false);
      setSelectedItems(new Set());
    },
  });

  const filteredItems = trashItems.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(term) ||
      item.lessonId.toLowerCase().includes(term) ||
      item.level.toLowerCase().includes(term)
    );
  });

  return (
    <div className={`min-h-screen ${dark ? "bg-[#070B17] text-white" : "bg-[#F8FAFC] text-slate-900"} p-4 md:p-8`}>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ─── TOP HEADER ─── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-gray-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <Link to="/admin/pipeline" className="text-xs text-purple-400 hover:underline flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Pipeline Hub
              </Link>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 flex items-center gap-3">
              <Trash2 className="w-7 h-7 text-red-500" />
              Recycle Bin (60-Day Trash)
            </h1>
            <p className={`text-xs ${dark ? "text-gray-400" : "text-slate-600"} mt-1`}>
              Deleted drafts and published content are held here for 60 days before automatic permanent deletion.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => refetch()}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                dark ? "border-white/10 hover:bg-white/5" : "border-slate-300 hover:bg-slate-100"
              }`}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            {trashItems.length > 0 && (
              <button
                onClick={() => setShowEmptyModal(true)}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 flex items-center gap-2 transition-all"
              >
                <Trash2 className="w-4 h-4" /> Empty Recycle Bin
              </button>
            )}
          </div>
        </div>

        {/* ─── SEARCH & STATS ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, lesson ID, or level..."
              className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                dark ? "bg-[#101828] border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500" : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-purple-500"
              } outline-none`}
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span>{filteredItems.length} Trashed Items</span>
          </div>
        </div>

        {/* ─── TRASH ITEMS LIST ─── */}
        {isLoading ? (
          <div className="text-center py-16 text-xs text-gray-400">Loading recycle bin contents...</div>
        ) : filteredItems.length === 0 ? (
          <div className={`p-12 rounded-2xl border text-center space-y-3 ${dark ? "bg-[#101828]/50 border-white/10" : "bg-white border-slate-200"}`}>
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold">Recycle Bin is Empty</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              No items have been deleted recently. Any drafts or content you delete will stay safe here for 60 days.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                  dark ? "bg-[#101828] border-white/10 hover:border-purple-500/30" : "bg-white border-slate-200 shadow-sm hover:border-purple-400"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {item.level}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold">{item.title}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                        {item.lessonId}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> ⏳ {item.daysRemaining} Days Left
                      </span>
                    </div>
                    <p className={`text-xs ${dark ? "text-gray-400" : "text-slate-500"} mt-1`}>
                      Deleted on {new Date(item.deletedAt).toLocaleDateString()} by <strong>{item.deletedBy}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => restoreMutation.mutate(item._id)}
                    disabled={restoreMutation.isPending}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow flex items-center gap-1.5 transition-all disabled:opacity-50"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Restore
                  </button>
                  <button
                    onClick={() => setShowPermanentModal(item._id)}
                    className="px-3.5 py-2 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/20 font-bold text-xs flex items-center gap-1.5 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete Permanently
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ─── MODAL: PERMANENT DELETE SINGLE ─── */}
      {showPermanentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className={`w-full max-w-md p-6 rounded-2xl border ${dark ? "bg-[#101828] border-white/10" : "bg-white border-slate-300"} shadow-2xl space-y-4 text-center`}>
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Permanently Delete Item?</h3>
              <p className="text-xs text-gray-400">
                This item will be permanently purged from the server. This action <strong>cannot be undone</strong>.
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowPermanentModal(null)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold border ${dark ? "border-white/10 hover:bg-white/5" : "border-slate-300 hover:bg-slate-100"}`}
              >
                Cancel
              </button>
              <button
                onClick={() => permanentDeleteMutation.mutate(showPermanentModal)}
                disabled={permanentDeleteMutation.isPending}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: EMPTY RECYCLE BIN ─── */}
      {showEmptyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className={`w-full max-w-md p-6 rounded-2xl border ${dark ? "bg-[#101828] border-white/10" : "bg-white border-slate-300"} shadow-2xl space-y-4 text-center`}>
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Empty Entire Recycle Bin?</h3>
              <p className="text-xs text-gray-400">
                Are you sure you want to permanently delete all {trashItems.length} items from the Recycle Bin?
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowEmptyModal(false)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold border ${dark ? "border-white/10 hover:bg-white/5" : "border-slate-300 hover:bg-slate-100"}`}
              >
                Cancel
              </button>
              <button
                onClick={() => emptyTrashMutation.mutate()}
                disabled={emptyTrashMutation.isPending}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow"
              >
                Empty Recycle Bin
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
