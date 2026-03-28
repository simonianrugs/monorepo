"use client";

import { useState, useMemo } from "react";
import { TOOLS, TOOL_CATEGORIES, Tool, ToolCategory } from "@/lib/tools";
import CategorySection from "@/components/CategorySection";
import StatsBar from "@/components/StatsBar";
import QuickLinks from "@/components/QuickLinks";

export default function Dashboard() {
  const [tools, setTools] = useState<Tool[]>(TOOLS);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<ToolCategory | "all">(
    "all"
  );
  const [filterStatus, setFilterStatus] = useState<
    "all" | "connected" | "not_connected"
  >("all");

  const handleToggleConnection = (toolId: string) => {
    setTools((prev) =>
      prev.map((t) =>
        t.id === toolId
          ? {
              ...t,
              status: t.status === "connected" ? "not_connected" : "connected",
            }
          : t
      )
    );
  };

  const filteredTools = useMemo(() => {
    return tools.filter((t) => {
      if (search) {
        const q = search.toLowerCase();
        if (
          !t.name.toLowerCase().includes(q) &&
          !t.description.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      if (filterCategory !== "all" && t.category !== filterCategory)
        return false;
      if (filterStatus !== "all" && t.status !== filterStatus) return false;
      return true;
    });
  }, [tools, search, filterCategory, filterStatus]);

  const groupedTools = useMemo(() => {
    const groups: Partial<Record<ToolCategory, Tool[]>> = {};
    for (const tool of filteredTools) {
      if (!groups[tool.category]) groups[tool.category] = [];
      groups[tool.category]!.push(tool);
    }
    return groups;
  }, [filteredTools]);

  const categoryOrder: ToolCategory[] = Object.keys(
    TOOL_CATEGORIES
  ) as ToolCategory[];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Simonian Rug Cleaners
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Command Center — All your business tools in one place
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                {tools.filter((t) => t.status === "connected").length} connected
              </span>
              <a
                href="/data"
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
              >
                Data Pipeline →
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="mb-8">
          <StatsBar tools={tools} />
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <QuickLinks tools={tools} />
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) =>
              setFilterCategory(e.target.value as ToolCategory | "all")
            }
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categoryOrder.map((cat) => (
              <option key={cat} value={cat}>
                {TOOL_CATEGORIES[cat].label}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(
                e.target.value as "all" | "connected" | "not_connected"
              )
            }
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="connected">Connected</option>
            <option value="not_connected">Not Connected</option>
          </select>
        </div>

        {/* Tool Cards by Category */}
        {categoryOrder.map((category) => {
          const categoryTools = groupedTools[category];
          if (!categoryTools || categoryTools.length === 0) return null;
          return (
            <CategorySection
              key={category}
              category={category}
              tools={categoryTools}
              onToggleConnection={handleToggleConnection}
            />
          );
        })}

        {filteredTools.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">
              No tools match your filters. Try adjusting your search.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
