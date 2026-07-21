import { createFileRoute, Link, Outlet, useRouterState, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "~/lib/AuthContext";
import { motion } from "framer-motion";
import {
  Users, BookOpen, FileText, Crown, Shield,
  ChevronLeft, Menu, GraduationCap, Settings, Wand2, Megaphone, CreditCard, BarChart3, Sliders,
  ChevronDown, ChevronUp, Layers, Clock
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  beforeLoad: ({ context }) => {
    // Redirect non-admin users away
    // Auth check is also done in the component for reactivity
  },
});

const navGroups = [
  {
    title: "Content Pipeline",
    items: [
      { label: "Content Pipeline", icon: Layers, href: "/admin/pipeline" },
      { label: "Drafts", icon: FileText, href: "/admin/pipeline/drafts" },
      { label: "Integrated Drafts", icon: Wand2, href: "/admin/pipeline/integrated" },
      { label: "Published Content", icon: Crown, href: "/admin/pipeline/published" },
      { label: "Published History", icon: Clock, href: "/admin/pipeline/history" },
      { label: "Audits & Quality", icon: Shield, href: "/admin/pipeline/audit" },
    ]
  },
  {
    title: "AI Generator",
    items: [
      { label: "Content Generator", icon: Wand2, href: "/admin/content" },
    ]
  },
  {
    title: "In-House Edit",
    items: [
      { label: "Syllabi", icon: BookOpen, href: "/admin/syllabi" },
      { label: "Lessons", icon: FileText, href: "/admin/lessons" },
      { label: "Exercises", icon: GraduationCap, href: "/admin/exercises" },
    ]
  },
  {
    title: "Platform Management",
    items: [
      { label: "Users", icon: Users, href: "/admin/users" },
      { label: "Subscriptions", icon: CreditCard, href: "/admin/subscriptions" },
      { label: "Announcements", icon: Megaphone, href: "/admin/announcements" },
      { label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
      { label: "API Settings", icon: Sliders, href: "/admin/settings" },
    ]
  }
];

function AdminLayout() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouterState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dark = true;

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "Content Pipeline": true,
    "AI Generator": true,
    "In-House Edit": true,
    "Platform Management": false,
  });

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => ({ ...prev, [title]: !prev[title] }));
  };

  // Auth guard
  if (isLoading) {
    return (
      <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Shield className="w-16 h-16 mx-auto text-red-400 mb-4" />
          <h1 className="text-xl font-bold dark:text-white text-gray-900 mb-2">Access Denied</h1>
          <p className="text-sm dark:text-gray-400 text-gray-600 mb-4">Please sign in to access the admin panel.</p>
          <Link to="/login" className="inline-block px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all">Sign In</Link>
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen dark:bg-[#070B17] bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Shield className="w-16 h-16 mx-auto text-amber-400 mb-4" />
          <h1 className="text-xl font-bold dark:text-white text-gray-900 mb-2">Admin Access Required</h1>
          <p className="text-sm dark:text-gray-400 text-gray-600 mb-4">You need admin privileges to access this area. Please contact your administrator.</p>
          <Link to="/dashboard" className="inline-block px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  const currentPath = router.location.pathname;
  const bg = dark ? "bg-[#070B17]" : "bg-gray-50";
  const border = dark ? "border-[#1e2a4a]" : "border-gray-200";

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      <div className="flex">
        {/* Mobile overlay */}
        {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-0 z-50 lg:z-0 h-screen w-64 dark:bg-[#070B17]/95 bg-white/95 backdrop-blur-xl border-r ${border} flex flex-col transition-all duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          {/* Logo */}
          <div className={`p-5 border-b ${border}`}>
            <Link to="/admin" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">F</div>
              <span className={`text-lg font-bold ${dark ? "text-white" : "text-gray-900"}`}>FrancPrep</span>
              <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">Admin</span>
            </Link>
          </div>

          {/* Nav items */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4 mt-2">
            {navGroups.map((group) => {
              const isOpen = openGroups[group.title];
              return (
                <div key={group.title} className="space-y-1">
                  <button onClick={() => toggleGroup(group.title)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider ${dark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"} transition-colors`}>
                    <span>{group.title}</span>
                    {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                  </button>
                  {isOpen && (
                    <div className="space-y-1">
                      {group.items.map((item) => {
                        const isActive = item.href === "/admin"
                          ? currentPath === "/admin" || currentPath === "/admin/"
                          : item.href === "/admin/pipeline"
                          ? currentPath === "/admin/pipeline" || currentPath === "/admin/pipeline/"
                          : currentPath.startsWith(item.href);
                        return (
                          <Link key={item.label} to={item.href as any}
                            onClick={() => setSidebarOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
                              isActive
                                ? "dark:bg-purple-500/20 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(124,58,237,0.15)]"
                                : "dark:text-gray-400 text-gray-600 hover:text-white hover:dark:bg-white/5 hover:bg-gray-100"
                            }`}
                          >
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className={`p-3 border-t ${border}`}>
            <Link to="/dashboard"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs dark:text-gray-500 text-gray-500 hover:text-purple-400 transition-colors">
              <ChevronLeft className="w-3 h-3" /> Back to Student View
            </Link>
          </div>
        </aside>

        {/* Main content area */}
        <div className="flex-1 min-h-screen">
          {/* Top navbar */}
          <header className={`sticky top-0 z-30 dark:bg-[#070B17]/80 bg-white/80 backdrop-blur-xl border-b ${border} transition-colors`}>
            <div className="flex items-center justify-between px-4 md:px-6 py-3">
              <div className="flex items-center gap-3">
                <button className="lg:hidden p-2 rounded-xl dark:hover:bg-white/5 hover:bg-gray-100 transition-colors" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
                  <Menu className="w-5 h-5 dark:text-gray-400 text-gray-600" />
                </button>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30">
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs font-semibold text-purple-400">Admin Panel</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-amber-500/10 bg-amber-50 border dark:border-amber-500/30 border-amber-200">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-500">{user.firstName} {user.lastName}</span>
                </div>
                <Link to="/dashboard" className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all">
                  <GraduationCap className="w-4 h-4" />
                  <span>Student View</span>
                </Link>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="p-4 md:p-6 lg:p-8 max-w-[1440px] mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}