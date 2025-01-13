"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ResponsiveContainer,
} from "recharts";

type ChartData = {
  makeModel: { labels: string[]; data: number[] };
  yearlyTrend: { labels: string[]; data: number[] };
  makeDistribution: { labels: string[]; data: number[] };
  rangeYear: Array<{ x: number; y: number }>;
  cleanFuel: {
    labels: string[];
    datasets: Array<{ label: string; data: number[]; backgroundColor: string }>;
  };
};

export default function Charts() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChartData() {
      try {
        setLoading(true);
        const response = await fetch("/api/chart-data");
        if (!response.ok) throw new Error("Failed to fetch chart data");

        const data = await response.json();
        if (!data || "error" in data) {
          throw new Error(data.error || "Invalid chart data");
        }

        setChartData(data);
      } catch (err) {
        console.error("Failed to fetch chart data:", err);
        setError(err instanceof Error ? err.message : "Failed to load charts");
      } finally {
        setLoading(false);
      }
    }

    fetchChartData();
  }, []);

  if (loading) return <div className="text-center py-4">Loading charts...</div>;
  if (error)
    return <div className="text-red-500 text-center py-4">{error}</div>;
  if (!chartData)
    return <div className="text-center py-4">No chart data available</div>;

  // Transform data for Recharts
  const makeModelData = chartData.makeModel.labels.map((label, index) => ({
    name: label,
    value: chartData.makeModel.data[index],
  }));

  const yearlyTrendData = chartData.yearlyTrend.labels.map((label, index) => ({
    year: label,
    vehicles: chartData.yearlyTrend.data[index],
  }));

  const makeDistributionData = chartData.makeDistribution.labels.map(
    (label, index) => ({
      name: label,
      value: chartData.makeDistribution.data[index],
    })
  );

  const cleanFuelData = chartData.cleanFuel.labels.map((label, index) => ({
    name: label,
    clean: chartData.cleanFuel.datasets[0].data[index],
    regular: chartData.cleanFuel.datasets[1].data[index],
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Top EV Models</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={makeModelData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Number of Vehicles" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Yearly EV Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={yearlyTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="vehicles"
              stroke="#8884d8"
              name="Number of Vehicles"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">EV Distribution by Make</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={makeDistributionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" name="Number of Vehicles" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          Electric Range vs Model Year
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="x" name="Model Year" />
            <YAxis type="number" dataKey="y" name="Range (miles)" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Range" data={chartData.rangeYear} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow col-span-full">
        <h2 className="text-xl font-semibold mb-4">
          Clean Fuel Vehicles by Make
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cleanFuelData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="clean" stackId="a" fill="#82ca9d" name="Clean Fuel" />
            <Bar dataKey="regular" stackId="a" fill="#8884d8" name="Regular" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
