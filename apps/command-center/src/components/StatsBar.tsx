"use client";

import { Tool } from "@/lib/tools";

interface StatsBarProps {
  tools: Tool[];
}

export default function StatsBar({ tools }: StatsBarProps) {
  const total = tools.length;
  const connected = tools.filter((t) => t.status === "connected").length;
  const totalDeepLinks = tools.reduce(
    (sum, t) => sum + t.deepLinks.length,
    0
  );
  const totalEndpoints = tools
    .filter((t) => t.status === "connected")
    .reduce((sum, t) => sum + (t.dataEndpoints?.length ?? 0), 0);

  const stats = [
    { label: "Total Tools", value: total, color: "text-gray-900" },
    { label: "Connected", value: connected, color: "text-green-600" },
    { label: "Deep Links", value: totalDeepLinks, color: "text-blue-600" },
    { label: "Live Data Endpoints", value: totalEndpoints, color: "text-purple-600" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          <p className="text-sm font-medium text-gray-500">{stat.label}</p>
          <p className={`mt-1 text-2xl font-bold ${stat.color}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
