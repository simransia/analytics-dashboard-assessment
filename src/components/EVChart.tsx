"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import type { ChartData } from "@/types";

const COLORS = ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b"];

export default function EVChart({
  type,
}: {
  type: "makeModel" | "yearlyTrend" | "makeDistribution";
}) {
  const [data, setData] = useState<ChartData[typeof type] | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/chart-data");
        const json = await res.json();
        setData(json[type]);
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      }
    }
    fetchData();
  }, [type]);

  if (!data) return null;

  switch (type) {
    case "makeModel":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data.labels.map((label, i) => ({
              name: label,
              value: data.data[i],
            }))}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#eee"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              fontSize={12}
              tickMargin={8}
              label={{
                value: "Model",
                position: "bottom",
                offset: 0,
                fontSize: 12,
                fill: "#666",
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              fontSize={12}
              label={{
                value: "Number of Vehicles",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                fontSize: 12,
                fill: "#666",
              }}
            />
            <Tooltip
              contentStyle={{
                background: "#fff",
                border: "none",
                borderRadius: "4px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            />
            <Bar dataKey="value" fill="#4e73df" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );

    case "yearlyTrend":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data.labels.map((label, i) => ({
              name: label,
              value: data.data[i],
            }))}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#eee"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              fontSize={12}
              tickMargin={8}
              label={{
                value: "Year",
                position: "bottom",
                offset: 0,
                fontSize: 12,
                fill: "#666",
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              fontSize={12}
              label={{
                value: "Number of Registrations",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                fontSize: 12,
                fill: "#666",
              }}
            />
            <Tooltip
              contentStyle={{
                background: "#fff",
                border: "none",
                borderRadius: "4px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4e73df"
              strokeWidth={2}
              dot={{ fill: "#4e73df", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );

    case "makeDistribution":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.labels.map((label, i) => ({
                name: label,
                value: data.data[i],
              }))}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.labels.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#fff",
                border: "none",
                borderRadius: "4px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="circle"
              iconSize={8}
              formatter={(value: string) => (
                <span className="text-xs text-gray-600">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      );
  }
}
