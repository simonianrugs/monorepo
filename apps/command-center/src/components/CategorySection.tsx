"use client";

import { Tool, ToolCategory, TOOL_CATEGORIES } from "@/lib/tools";
import ToolCard from "./ToolCard";

interface CategorySectionProps {
  category: ToolCategory;
  tools: Tool[];
  onToggleConnection: (toolId: string) => void;
}

export default function CategorySection({
  category,
  tools,
  onToggleConnection,
}: CategorySectionProps) {
  const categoryInfo = TOOL_CATEGORIES[category];
  const connectedCount = tools.filter((t) => t.status === "connected").length;

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            {categoryInfo.label}
          </h2>
          <p className="text-sm text-gray-500">{categoryInfo.description}</p>
        </div>
        <span className="text-sm text-gray-400">
          {connectedCount}/{tools.length} connected
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onToggleConnection={onToggleConnection}
          />
        ))}
      </div>
    </section>
  );
}
