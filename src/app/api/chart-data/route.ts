import { NextResponse } from "next/server";
import { processData } from "@/lib/data";

export async function GET() {
  try {
    const records = await processData();

    // Process data for charts
    const makeCount = new Map<string, number>();
    const yearCount = new Map<string, number>();
    records.forEach((record) => {
      // Make distribution
      makeCount.set(record.make, (makeCount.get(record.make) || 0) + 1);
      // Yearly trend
      const year = record.modelYear.toString();
      yearCount.set(year, (yearCount.get(year) || 0) + 1);
    });

    // Sort and limit to top makes
    const topMakes = [...makeCount.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Sort years
    const sortedYears = [...yearCount.entries()].sort(
      (a, b) => parseInt(a[0]) - parseInt(b[0])
    );

    return NextResponse.json({
      makeModel: {
        labels: topMakes.map(([make]) => make),
        data: topMakes.map(([_, count]) => count),
      },
      yearlyTrend: {
        labels: sortedYears.map(([year]) => year),
        data: sortedYears.map(([_, count]) => count),
      },
      makeDistribution: {
        labels: topMakes.map(([make]) => make),
        data: topMakes.map(([_, count]) => count),
      },
    });
  } catch (error) {
    console.error("Error processing chart data:", error);
    return NextResponse.json(
      { error: "Failed to process chart data" },
      { status: 500 }
    );
  }
}
