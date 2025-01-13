"use client";

import { useEffect, useState } from "react";

type Stats = {
  totalVehicles: number;
  avgRange: number;
  topMake: string;
  cleanFuelVehicles: number;
};

export default function StatsCards() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const response = await fetch("/api/stats");
        if (!response.ok) throw new Error("Failed to fetch stats");

        const data = await response.json();
        if (!data || "error" in data) {
          throw new Error(data.error || "Invalid stats data");
        }

        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
        setError(err instanceof Error ? err.message : "Failed to load stats");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) return <div>Loading stats...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!stats) return <div>No stats available</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm font-medium">Total Vehicles</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">
          {stats.totalVehicles.toLocaleString()}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm font-medium">Average Range</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">
          {stats.avgRange} miles
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm font-medium">Top Make</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">
          {stats.topMake}
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-gray-500 text-sm font-medium">
          Clean Fuel Vehicles
        </h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">
          {stats.cleanFuelVehicles.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
