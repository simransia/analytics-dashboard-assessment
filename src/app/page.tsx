import DashboardStats from "@/components/DashboardStats";
import DataTable from "@/components/DataTable";
import EVChart from "@/components/EVChart";
import { Bell, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F9FC] p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#5a5c69]">
          EV Analytics Dashboard
        </h1>
        <div className="flex gap-4">
          <button className="rounded-full bg-white p-2 shadow hover:bg-gray-50">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
          <button className="rounded-full bg-white p-2 shadow hover:bg-gray-50">
            <MapPin className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-8">
        <DashboardStats />
      </div>

      {/* Charts Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-4 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-600">
              Popular EV Models
            </h2>
            <select className="rounded border p-1 text-xs text-gray-600">
              <option>All Time</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-64">
            <EVChart type="makeModel" />
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-600">Yearly Growth</h2>
            <select className="rounded border p-1 text-xs text-gray-600">
              <option>2000 - 2024</option>
            </select>
          </div>
          <div className="h-64">
            <EVChart type="yearlyTrend" />
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-600">
              Manufacturer Distribution
            </h2>
            <select className="rounded border p-1 text-xs text-gray-600">
              <option>Top Manufacturers</option>
            </select>
          </div>
          <div className="h-64">
            <EVChart type="makeDistribution" />
          </div>
        </div>
      </div>

      {/* Vehicle Data Table */}
      <div className="rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium text-gray-900">
              Electric Vehicle Registry
            </h2>
            <div className="flex gap-3">
              <button className="rounded-full bg-blue-100 px-4 py-1 text-xs font-medium text-blue-700">
                CLEAN FUEL ELIGIBLE
              </button>
              <button className="rounded-full bg-gray-100 px-4 py-1 text-xs font-medium text-gray-700">
                BATTERY ELECTRIC
              </button>
              <button className="rounded-full bg-green-100 px-4 py-1 text-xs font-medium text-green-700">
                PLUG-IN HYBRID
              </button>
            </div>
          </div>
        </div>
        <DataTable />
      </div>
    </div>
  );
}
