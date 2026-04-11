"use client";

import Link from "next/link";
import {
  HUBSPOT_SUMMARY,
  PIPELINES,
  RECENT_DEALS,
  RECENT_CONTACTS,
  RECENT_INVOICES,
  RECENT_COMPANIES,
  HS_DOMAIN,
  HS_PORTAL,
} from "@/lib/hubspot-data";
import { TOOLS } from "@/lib/tools";

// Build a stage label lookup from all pipelines
const STAGE_LABELS: Record<string, string> = {};
PIPELINES.forEach((p) =>
  p.stages.forEach((s) => {
    STAGE_LABELS[s.id] = s.label;
  })
);

// Group recent deals by pipeline
function groupDealsByPipeline() {
  const groups: Record<string, typeof RECENT_DEALS> = {};
  for (const deal of RECENT_DEALS) {
    if (!groups[deal.pipelineId]) groups[deal.pipelineId] = [];
    groups[deal.pipelineId].push(deal);
  }
  return groups;
}

export default function OperationsPage() {
  const dealsByPipeline = groupDealsByPipeline();
  const connectedTools = TOOLS.filter((t) => t.status === "connected");
  const disconnectedTools = TOOLS.filter((t) => t.status !== "connected");

  const totalOpenInvoices = RECENT_INVOICES.filter(
    (i) => i.status === "open"
  ).reduce((s, i) => s + i.amount, 0);

  const newLeads = RECENT_CONTACTS.filter(
    (c) => c.lifecycleStage === "lead"
  ).length;
  const customers = RECENT_CONTACTS.filter(
    (c) => c.lifecycleStage === "customer"
  ).length;
  const subscribers = RECENT_CONTACTS.filter(
    (c) => c.lifecycleStage === "subscriber"
  ).length;

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Operations Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Unified view of daily operations, pipeline health, and team
                activity
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                ← Command Center
              </Link>
              <Link
                href="/data"
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
              >
                Data Pipelines
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ─── KPI Row ──────────────────────────────────────────── */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {[
            {
              label: "Total Contacts",
              value: HUBSPOT_SUMMARY.contacts.total.toLocaleString(),
              color: "text-gray-900",
              href: `${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-1`,
            },
            {
              label: "Active Deals",
              value: HUBSPOT_SUMMARY.deals.total.toLocaleString(),
              color: "text-blue-600",
              href: `${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-3`,
            },
            {
              label: "Companies",
              value: HUBSPOT_SUMMARY.companies.total.toLocaleString(),
              color: "text-purple-600",
              href: `${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-2`,
            },
            {
              label: "Open Invoices",
              value: `$${totalOpenInvoices.toFixed(0)}`,
              color: "text-yellow-600",
              href: `${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-53`,
            },
            {
              label: "New Leads",
              value: newLeads.toString(),
              color: "text-orange-600",
              href: `${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-1`,
            },
            {
              label: "Active Pipelines",
              value: PIPELINES.filter((p) => p.stages.length > 0)
                .length.toString(),
              color: "text-green-600",
              href: `${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-3`,
            },
          ].map((kpi) => (
            <a
              key={kpi.label}
              href={kpi.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-gray-300"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                {kpi.label}
              </p>
              <p className={`mt-1 text-2xl font-bold ${kpi.color}`}>
                {kpi.value}
              </p>
            </a>
          ))}
        </div>

        {/* ─── Contact Funnel ──────────────────────────────────── */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            Contact Funnel (Recent Snapshot)
          </h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-3xl font-bold text-blue-600">{subscribers}</p>
              <p className="text-sm text-blue-700">Subscribers</p>
            </div>
            <div className="rounded-lg bg-yellow-50 p-4">
              <p className="text-3xl font-bold text-yellow-600">{newLeads}</p>
              <p className="text-sm text-yellow-700">Leads</p>
            </div>
            <div className="rounded-lg bg-green-50 p-4">
              <p className="text-3xl font-bold text-green-600">{customers}</p>
              <p className="text-sm text-green-700">Customers</p>
            </div>
          </div>
        </div>

        {/* ─── Pipeline Boards ─────────────────────────────────── */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            Active Pipeline Boards
          </h2>
          {PIPELINES.filter((p) => p.stages.length > 0).map((pipeline) => {
            const deals = dealsByPipeline[pipeline.id] ?? [];
            return (
              <div
                key={pipeline.id}
                className="mb-6 rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                  <h3 className="font-semibold text-gray-900">
                    {pipeline.name}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {deals.length} recent deal{deals.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Stage chips */}
                <div className="overflow-x-auto px-5 py-3">
                  <div className="flex gap-2">
                    {pipeline.stages.map((stage, idx) => {
                      const stageDeals = deals.filter(
                        (d) => d.stage === stage.id
                      );
                      return (
                        <div
                          key={stage.id}
                          className={`flex-shrink-0 rounded-lg border p-3 min-w-[140px] ${
                            stageDeals.length > 0
                              ? "border-orange-200 bg-orange-50"
                              : "border-gray-100 bg-gray-50"
                          }`}
                        >
                          <p className="text-xs font-medium text-gray-500">
                            {idx + 1}. {stage.label}
                          </p>
                          {stageDeals.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {stageDeals.map((d) => (
                                <a
                                  key={d.id}
                                  href={d.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block rounded bg-white px-2 py-1 text-xs text-gray-700 shadow-sm hover:shadow"
                                >
                                  {d.name.length > 30
                                    ? d.name.slice(0, 30) + "..."
                                    : d.name}
                                  {d.amount && (
                                    <span className="ml-1 font-medium text-green-600">
                                      ${d.amount}
                                    </span>
                                  )}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── Tool Connection Status ──────────────────────────── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-green-200 bg-white shadow-sm">
            <div className="border-b border-green-100 px-5 py-4">
              <h3 className="font-semibold text-green-800">
                Connected ({connectedTools.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-50">
              {connectedTools.map((t) => (
                <div key={t.id} className="flex items-center gap-3 px-5 py-3">
                  <span>{t.iconEmoji}</span>
                  <span className="font-medium text-gray-800">{t.name}</span>
                  <span className="ml-auto text-xs text-gray-400">
                    {t.deepLinks.length} links | {t.dataEndpoints?.length ?? 0}{" "}
                    endpoints
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-4">
              <h3 className="font-semibold text-gray-600">
                Not Yet Connected ({disconnectedTools.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-50">
              {disconnectedTools.map((t) => (
                <div key={t.id} className="flex items-center gap-3 px-5 py-3">
                  <span className="opacity-50">{t.iconEmoji}</span>
                  <span className="text-gray-500">{t.name}</span>
                  <a
                    href={t.loginUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto rounded border border-gray-200 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Login →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
