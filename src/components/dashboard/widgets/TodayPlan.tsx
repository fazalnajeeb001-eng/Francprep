import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { CheckCircle2, Circle, Plus, Trash2, GripVertical, X } from "lucide-react";
import { useWidgets } from "~/lib/WidgetsContext";

interface Task {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
}

export function TodayPlan({ dark }: { dark: boolean }) {
  const { widgets, updateTodayTasks } = useWidgets();
  const tasks = widgets?.todayTasks || [];
  const [newText, setNewText] = useState("");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (showInput && inputRef.current) inputRef.current.focus(); }, [showInput]);

  const addTask = () => {
    const text = newText.trim();
    if (!text) return;
    const task: Task = { id: `t-${Date.now()}`, text, done: false, createdAt: Date.now() };
    updateTodayTasks([...tasks, task]);
    setNewText("");
  };

  const toggleTask = (id: string) => {
    updateTodayTasks(tasks.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id: string) => {
    updateTodayTasks(tasks.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    updateTodayTasks(tasks.filter((t) => !t.done));
  };

  const doneCount = tasks.filter((t) => t.done).length;
  const totalTasks = tasks.length;

  return (
    <div className={`${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white/80 border-gray-200"} backdrop-blur-lg border rounded-2xl p-5 transition-colors`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`text-sm font-semibold ${dark ? "text-gray-300" : "text-gray-700"}`}>📋 My Tasks</h3>
          {totalTasks > 0 && (
            <p className={`text-[10px] ${dark ? "text-gray-500" : "text-gray-400"} mt-0.5`}>
              {doneCount}/{totalTasks} completed
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {doneCount > 0 && (
            <button onClick={clearCompleted} className={`text-[10px] font-semibold transition-colors ${dark ? "text-gray-500 hover:text-red-400" : "text-gray-400 hover:text-red-500"}`}>
              Clear done
            </button>
          )}
          <button onClick={() => setShowInput(!showInput)} className={`text-xs flex items-center gap-1 font-semibold transition-colors ${dark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"}`}>
            {showInput ? <X className="w-3.5 h-3.5" /> : <><Plus className="w-3.5 h-3.5" /> Add</>}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showInput && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-3">
            <div className="flex gap-2">
              <input ref={inputRef} type="text" value={newText} onChange={(e) => setNewText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") addTask(); if (e.key === "Escape") { setShowInput(false); setNewText(""); } }}
                placeholder="What do you need to do today?"
                className={`flex-1 ${dark ? "bg-[#070B17] border-[#1e2a4a] text-white" : "bg-white border-gray-200 text-gray-900"} rounded-xl px-3 py-2.5 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border`} />
              <button onClick={addTask} disabled={!newText.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-all disabled:opacity-40">
                Add
              </button>
            </div>
            <div className="flex gap-1.5 mt-2 flex-wrap">
              {["Review vocabulary", "Practice grammar", "Do a mock test", "Listen to a podcast", "Write a short essay"].map((suggestion) => (
                <button key={suggestion} onClick={() => { setNewText(suggestion); }}
                  className={`text-[10px] px-2 py-1 rounded-lg transition-colors ${dark ? "bg-[#070B17] border border-[#1e2a4a] text-gray-400 hover:text-white hover:border-purple-500/50" : "bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200"}`}>
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {tasks.length === 0 && !showInput ? (
        <div className="text-center py-8">
          <p className={`text-sm ${dark ? "text-gray-500" : "text-gray-400"} mb-3`}>No tasks yet. What's your goal for today?</p>
          <button onClick={() => setShowInput(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
            <Plus className="w-3.5 h-3.5 inline mr-1" /> Add your first task
          </button>
        </div>
      ) : (
        <div className="space-y-1 max-h-72 overflow-y-auto">
          {tasks.map((task, i) => (
            <motion.div key={task.id} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
              transition={{ delay: i * 0.03 }}
              className={`flex items-center gap-3 p-2.5 rounded-xl ${dark ? "hover:bg-white/5" : "hover:bg-gray-100"} transition-colors group`}>
              <GripVertical className={`w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${dark ? "text-gray-600" : "text-gray-300"}`} />
              <button onClick={() => toggleTask(task.id)} className="flex-shrink-0">
                {task.done ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Circle className={`w-5 h-5 ${dark ? "text-gray-600" : "text-gray-300"}`} />}
              </button>
              <span className={`flex-1 text-sm ${task.done ? "line-through text-emerald-400" : dark ? "text-white" : "text-gray-900"}`}>
                {task.text}
              </span>
              <button onClick={() => deleteTask(task.id)}
                className={`opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ${dark ? "text-gray-500 hover:text-red-400" : "text-gray-400 hover:text-red-500"}`}>
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
