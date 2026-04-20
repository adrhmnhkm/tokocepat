"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import FeedbackWidget from "@/components/dashboard/FeedbackWidget";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

type Props = {
  user: { name?: string | null; email?: string | null };
  children: React.ReactNode;
};

export default function DashboardShell({ user, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <Sidebar user={user} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar user={user} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-slate-200 flex items-center justify-between px-4 h-14">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Open menu"
          >
            <div className="space-y-1.5">
              <span className="block w-5 h-0.5 bg-slate-700 rounded" />
              <span className="block w-5 h-0.5 bg-slate-700 rounded" />
              <span className="block w-5 h-0.5 bg-slate-700 rounded" />
            </div>
          </button>
          <Logo size="sm" asLink={false} />
          <div className="w-9" />
        </header>

        <main className="flex-1">{children}</main>
      </div>

      <FeedbackWidget />
    </div>
  );
}
