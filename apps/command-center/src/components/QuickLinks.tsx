"use client";

import { Tool } from "@/lib/tools";

interface QuickLinksProps {
  tools: Tool[];
}

export default function QuickLinks({ tools }: QuickLinksProps) {
  const connectedTools = tools.filter((t) => t.status === "connected");

  if (connectedTools.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center">
        <p className="text-gray-500">
          Connect your tools to see quick links here
        </p>
        <p className="mt-1 text-sm text-gray-400">
          Click &quot;Connect&quot; on any tool card below to get started
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
        Quick Launch — Connected Tools
      </h3>
      <div className="flex flex-wrap gap-2">
        {connectedTools.map((tool) => (
          <a
            key={tool.id}
            href={tool.loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-all hover:shadow-md hover:border-gray-300"
          >
            <span>{tool.iconEmoji}</span>
            {tool.name}
          </a>
        ))}
      </div>
    </div>
  );
}
