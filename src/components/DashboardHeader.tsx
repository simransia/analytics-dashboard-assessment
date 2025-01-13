export default function DashboardHeader() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              EV Population Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Analyze electric vehicle adoption trends and insights
            </p>
          </div>

          {/* Add filters/time period selector later */}
          <div className="flex gap-4">
            <select
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              defaultValue="all"
            >
              <option value="all">All Time</option>
              <option value="year">Past Year</option>
              <option value="month">Past Month</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
