"use client";

import { useState } from "react";
import { TOOLS, Tool } from "@/lib/tools";
import Link from "next/link";

interface DataPipeline {
  toolId: string;
  endpoint: string;
  enabled: boolean;
  schedule: "realtime" | "hourly" | "daily" | "weekly";
  lastSync: string | null;
}

export default function DataPipelinePage() {
  const [tools] = useState<Tool[]>(TOOLS);
  const [pipelines, setPipelines] = useState<DataPipeline[]>([]);

  const toolsWithData = tools.filter(
    (t) => t.dataEndpoints && t.dataEndpoints.length > 0
  );

  const togglePipeline = (toolId: string, endpoint: string) => {
    setPipelines((prev) => {
      const existing = prev.find(
        (p) => p.toolId === toolId && p.endpoint === endpoint
      );
      if (existing) {
        return prev.map((p) =>
          p.toolId === toolId && p.endpoint === endpoint
            ? { ...p, enabled: !p.enabled }
            : p
        );
      }
      return [
        ...prev,
        {
          toolId,
          endpoint,
          enabled: true,
          schedule: "daily",
          lastSync: null,
        },
      ];
    });
  };

  const updateSchedule = (
    toolId: string,
    endpoint: string,
    schedule: DataPipeline["schedule"]
  ) => {
    setPipelines((prev) =>
      prev.map((p) =>
        p.toolId === toolId && p.endpoint === endpoint
          ? { ...p, schedule }
          : p
      )
    );
  };

  const getPipeline = (toolId: string, endpoint: string) =>
    pipelines.find((p) => p.toolId === toolId && p.endpoint === endpoint);

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Data Pipeline Configuration
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Configure which data to pull from your connected tools
              </p>
            </div>
            <Link
              href="/"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Pipeline Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Available Pipelines
            </p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {toolsWithData.reduce(
                (sum, t) => sum + (t.dataEndpoints?.length ?? 0),
                0
              )}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Active Pipelines
            </p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              {pipelines.filter((p) => p.enabled).length}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Data Sources Ready
            </p>
            <p className="mt-1 text-2xl font-bold text-blue-600">
              {toolsWithData.length}
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <h3 className="font-semibold text-blue-900">
            How Data Pipelines Work
          </h3>
          <p className="mt-1 text-sm text-blue-700">
            Once you connect a tool on the main dashboard, enable its data
            endpoints here to start pulling data into your command center. Choose
            a sync schedule that fits your needs. Data will appear on your
            dashboard in real-time once pipelines are active.
          </p>
        </div>

        {/* Data Source Cards */}
        {toolsWithData.map((tool) => (
          <div
            key={tool.id}
            className="mb-6 rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-lg"
                  style={{ backgroundColor: tool.color + "18" }}
                >
                  {tool.iconEmoji}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                  <p className="text-sm text-gray-500">{tool.description}</p>
                </div>
              </div>
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                  tool.status === "connected"
                    ? "border-green-200 bg-green-100 text-green-800"
                    : "border-gray-200 bg-gray-100 text-gray-500"
                }`}
              >
                {tool.status === "connected"
                  ? "Ready to sync"
                  : "Connect first"}
              </span>
            </div>

            <div className="divide-y divide-gray-50">
              {tool.dataEndpoints?.map((endpoint) => {
                const pipeline = getPipeline(tool.id, endpoint);
                return (
                  <div
                    key={endpoint}
                    className="flex items-center justify-between px-5 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => togglePipeline(tool.id, endpoint)}
                        disabled={tool.status !== "connected"}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          pipeline?.enabled
                            ? "bg-green-500"
                            : "bg-gray-200"
                        } ${tool.status !== "connected" ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                            pipeline?.enabled
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                      <span className="text-sm font-medium capitalize text-gray-700">
                        {endpoint.replace(/_/g, " ")}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {pipeline?.enabled && (
                        <select
                          value={pipeline.schedule}
                          onChange={(e) =>
                            updateSchedule(
                              tool.id,
                              endpoint,
                              e.target.value as DataPipeline["schedule"]
                            )
                          }
                          className="rounded-md border border-gray-300 px-2 py-1 text-xs focus:border-blue-500 focus:outline-none"
                        >
                          <option value="realtime">Real-time</option>
                          <option value="hourly">Hourly</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                        </select>
                      )}
                      <span className="text-xs text-gray-400">
                        {pipeline?.lastSync
                          ? `Last: ${pipeline.lastSync}`
                          : "Never synced"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
