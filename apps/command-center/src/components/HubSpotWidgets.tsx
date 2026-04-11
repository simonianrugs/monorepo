"use client";

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

function StageBadge({ stageId }: { stageId: string }) {
  const stageMap: Record<string, { label: string; color: string }> = {};
  PIPELINES.forEach((p) =>
    p.stages.forEach((s) => {
      stageMap[s.id] = { label: s.label, color: "#6b7280" };
    })
  );
  const stage = stageMap[stageId];
  if (!stage) return <span className="text-xs text-gray-400">—</span>;
  return (
    <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
      {stage.label}
    </span>
  );
}

export function CrmSummaryCards() {
  const entries = Object.entries(HUBSPOT_SUMMARY);
  const icons: Record<string, string> = {
    contacts: "👤",
    deals: "💰",
    companies: "🏢",
    invoices: "📄",
    tickets: "🎫",
  };
  const links: Record<string, string> = {
    contacts: `${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-1`,
    deals: `${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-3`,
    companies: `${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-2`,
    invoices: `${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-53`,
    tickets: `${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-5`,
  };

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {entries.map(([key, { total, label }]) => (
        <a
          key={key}
          href={links[key]}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-orange-300"
        >
          <div className="flex items-center gap-2">
            <span>{icons[key]}</span>
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
              {label}
            </span>
          </div>
          <span className="mt-2 text-2xl font-bold text-gray-900">
            {total.toLocaleString()}
          </span>
          <span className="mt-1 text-xs text-orange-500 opacity-0 transition-opacity group-hover:opacity-100">
            Open in HubSpot →
          </span>
        </a>
      ))}
    </div>
  );
}

export function PipelineOverview() {
  const activePipelines = PIPELINES.filter((p) => p.stages.length > 0);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h3 className="font-semibold text-gray-900">Active Pipelines</h3>
        <a
          href={`${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-3`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          View All →
        </a>
      </div>
      <div className="divide-y divide-gray-50">
        {activePipelines.map((pipeline) => (
          <div key={pipeline.id} className="px-5 py-3">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">
                {pipeline.name}
              </span>
              <span className="text-xs text-gray-400">
                {pipeline.stages.length} stages
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {pipeline.stages.map((stage, i) => (
                <span
                  key={stage.id}
                  className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                >
                  <span className="mr-1 text-gray-400">{i + 1}.</span>
                  {stage.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecentDealsTable() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h3 className="font-semibold text-gray-900">Recent Deals</h3>
        <a
          href={`${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-3`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          All 9,201 →
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wider text-gray-400">
              <th className="px-5 py-2">Deal</th>
              <th className="px-5 py-2">Amount</th>
              <th className="px-5 py-2">Stage</th>
              <th className="px-5 py-2">Close Date</th>
              <th className="px-5 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {RECENT_DEALS.map((deal) => (
              <tr key={deal.id} className="hover:bg-gray-50">
                <td className="px-5 py-2.5 font-medium text-gray-800 max-w-[260px] truncate">
                  {deal.name}
                </td>
                <td className="px-5 py-2.5 text-gray-600">
                  {deal.amount ? `$${deal.amount.toFixed(2)}` : "—"}
                </td>
                <td className="px-5 py-2.5">
                  <StageBadge stageId={deal.stage} />
                </td>
                <td className="px-5 py-2.5 text-gray-500">{deal.closeDate}</td>
                <td className="px-5 py-2.5">
                  <a
                    href={deal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-700"
                  >
                    Open →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function RecentContactsList() {
  const stageColors: Record<string, string> = {
    subscriber: "bg-blue-100 text-blue-700",
    lead: "bg-yellow-100 text-yellow-700",
    customer: "bg-green-100 text-green-700",
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h3 className="font-semibold text-gray-900">Recent Contacts</h3>
        <a
          href={`${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-1`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          All 24,004 →
        </a>
      </div>
      <div className="divide-y divide-gray-50">
        {RECENT_CONTACTS.map((c) => (
          <a
            key={c.id}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-gray-50"
          >
            <div>
              <span className="font-medium text-gray-800">{c.name}</span>
              {c.email && (
                <span className="ml-2 text-sm text-gray-400">{c.email}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${stageColors[c.lifecycleStage] ?? "bg-gray-100 text-gray-600"}`}
              >
                {c.lifecycleStage}
              </span>
              <span className="text-gray-300">→</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function InvoiceWidget() {
  const statusStyles: Record<string, string> = {
    open: "bg-yellow-100 text-yellow-800",
    paid: "bg-green-100 text-green-800",
    draft: "bg-gray-100 text-gray-600",
    voided: "bg-red-100 text-red-800",
  };

  const totalOpen = RECENT_INVOICES.filter((i) => i.status === "open").reduce(
    (s, i) => s + i.amount,
    0
  );
  const totalPaid = RECENT_INVOICES.filter((i) => i.status === "paid").reduce(
    (s, i) => s + i.amount,
    0
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h3 className="font-semibold text-gray-900">Invoices</h3>
        <a
          href={`${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-53`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          All 16 →
        </a>
      </div>
      <div className="grid grid-cols-2 gap-3 border-b border-gray-100 px-5 py-3">
        <div>
          <p className="text-xs text-gray-400">Open (Outstanding)</p>
          <p className="text-lg font-bold text-yellow-600">
            ${totalOpen.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Paid (Collected)</p>
          <p className="text-lg font-bold text-green-600">
            ${totalPaid.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="divide-y divide-gray-50">
        {RECENT_INVOICES.map((inv) => (
          <div
            key={inv.id}
            className="flex items-center justify-between px-5 py-2.5"
          >
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[inv.status]}`}
              >
                {inv.status}
              </span>
              <span className="text-sm font-medium text-gray-800">
                {inv.number}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                ${inv.amount.toFixed(2)}
              </span>
              <span className="text-xs text-gray-400">Due {inv.dueDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CompaniesWidget() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h3 className="font-semibold text-gray-900">Recent Companies</h3>
        <a
          href={`${HS_DOMAIN}/contacts/${HS_PORTAL}/objects/0-2`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          All 655 →
        </a>
      </div>
      <div className="divide-y divide-gray-50">
        {RECENT_COMPANIES.map((co) => (
          <a
            key={co.id}
            href={co.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors"
          >
            <div>
              <span className="font-medium text-gray-800">{co.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">{co.city}</span>
              <span className="text-gray-300">→</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
