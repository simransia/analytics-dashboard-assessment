"use client";

import { useEffect, useState } from "react";
import { Car, Gauge, Award, Zap } from "lucide-react";
import type { Stats } from "@/types";

type StatCardType = {
  key: keyof Stats;
  title: string;
  format: (value: number | string) => string;
  icon: React.ElementType;
  bgColor: string;
  iconColor: string;
};

const statCards: StatCardType[] = [
  {
    key: "totalVehicles",
    title: "Total EVs",
    format: (value) =>
      typeof value === "number" ? value.toLocaleString() : "0",
    icon: Car,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    key: "avgRange",
    title: "Average Range",
    format: (value) => `${value || 0} miles`,
    icon: Gauge,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    key: "topMake",
    title: "Top Manufacturer",
    format: (value) => String(value || "N/A"),
    icon: Award,
    bgColor: "bg-pink-50",
    iconColor: "text-pink-500",
  },
  {
    key: "cleanFuelVehicles",
    title: "Clean Fuel Vehicles",
    format: (value) =>
      typeof value === "number" ? value.toLocaleString() : "0",
    icon: Zap,
    bgColor: "bg-orange-50",
    iconColor: "text-orange-500",
  },
] as const;

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    }
    fetchStats();
  }, []);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((card) => (
        <div
          key={card.key}
          className="relative overflow-hidden rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <p className="mt-2 flex items-baseline">
                <span className="text-2xl font-semibold text-gray-900">
                  {card.format(stats[card.key])}
                </span>
              </p>
            </div>
            <div className={`rounded-full ${card.bgColor} p-3`}>
              <card.icon className={`h-6 w-6 ${card.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
