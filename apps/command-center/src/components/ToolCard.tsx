"use client";

import { Tool } from "@/lib/tools";

interface ToolCardProps {
  tool: Tool;
  onToggleConnection: (toolId: string) => void;
}

export default function ToolCard({ tool, onToggleConnection }: ToolCardProps) {
  const statusColors = {
    connected: "bg-green-100 text-green-800 border-green-200",
    not_connected: "bg-gray-100 text-gray-500 border-gray-200",
    needs_reauth: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };

  const statusLabels = {
    connected: "Connected",
    not_connected: "Not Connected",
    needs_reauth: "Needs Re-auth",
  };

  return (
    <div className="group relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-gray-300">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-lg text-xl"
            style={{ backgroundColor: tool.color + "18" }}
          >
            {tool.iconEmoji}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{tool.name}</h3>
            <p className="text-sm text-gray-500">{tool.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[tool.status]}`}
        >
          <span
            className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
              tool.status === "connected"
                ? "bg-green-500"
                : tool.status === "needs_reauth"
                  ? "bg-yellow-500"
                  : "bg-gray-400"
            }`}
          />
          {statusLabels[tool.status]}
        </span>

        <div className="flex gap-2">
          <a
            href={tool.loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: tool.color }}
          >
            Open →
          </a>
          <button
            onClick={() => onToggleConnection(tool.id)}
            className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
              tool.status === "connected"
                ? "border-red-200 text-red-600 hover:bg-red-50"
                : "border-green-200 text-green-700 hover:bg-green-50"
            }`}
          >
            {tool.status === "connected" ? "Disconnect" : "Connect"}
          </button>
        </div>
      </div>

      {tool.status === "connected" && tool.dataEndpoints && (
        <div className="mt-3 border-t border-gray-100 pt-3">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-gray-400">
            Available Data
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tool.dataEndpoints.map((endpoint) => (
              <span
                key={endpoint}
                className="inline-flex rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"
              >
                {endpoint}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
