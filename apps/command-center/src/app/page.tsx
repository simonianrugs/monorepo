"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { TOOLS, TOOL_CATEGORIES, Tool, ToolCategory } from "@/lib/tools";
import CategorySection from "@/components/CategorySection";
import StatsBar from "@/components/StatsBar";
import QuickLinks from "@/components/QuickLinks";
import {
  CrmSummaryCards,
  PipelineOverview,
  RecentDealsTable,
  RecentContactsList,
  InvoiceWidget,
  CompaniesWidget,
} from "@/components/HubSpotWidgets";

type TabKey = "overview" | "tools" | "pipelines";

export default function Dashboard() {
  const [tools, setTools] = useState<Tool[]>(TOOLS);
  const [tab, setTab] = useState<TabKey>("overview");
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

  const categoryOrder = Object.keys(TOOL_CATEGORIES) as ToolCategory[];
  const tabs: { key: TabKey; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "tools", label: "All Tools & Links" },
    { key: "pipelines", label: "Pipelines & Deals" },
  ];

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
                RevOps Command Center — Unified view of every tool, pipeline,
                and data source
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                {tools.filter((t) => t.status === "connected").length} connected
              </span>
              <Link
                href="/operations"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Operations Dashboard
              </Link>
              <Link
                href="/data"
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
              >
                Data Pipelines
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex gap-1 border-b border-gray-200">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  tab === t.key
                    ? "border-brand-600 text-brand-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ─── OVERVIEW TAB ─────────────────────────────────────────── */}
        {tab === "overview" && (
          <div className="space-y-8">
            {/* Tool Stats */}
            <StatsBar tools={tools} />

            {/* CRM Summary (live from HubSpot) */}
            <div>
              <h2 className="mb-3 text-lg font-bold text-gray-900">
                HubSpot CRM — Live Data
              </h2>
              <CrmSummaryCards />
            </div>

            {/* Quick Links */}
            <QuickLinks tools={tools} />

            {/* Two-column layout: Deals + Contacts */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <RecentDealsTable />
              <RecentContactsList />
            </div>

            {/* Two-column: Invoices + Companies */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <InvoiceWidget />
              <CompaniesWidget />
            </div>
          </div>
        )}

        {/* ─── TOOLS TAB ───────────────────────────────────────────── */}
        {tab === "tools" && (
          <div>
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
                <p className="text-gray-500">No tools match your filters.</p>
              </div>
            )}
          </div>
        )}

        {/* ─── PIPELINES TAB ───────────────────────────────────────── */}
        {tab === "pipelines" && (
          <div className="space-y-8">
            <PipelineOverview />
            <RecentDealsTable />
          </div>
        )}
      </main>
    </div>
  );
}
