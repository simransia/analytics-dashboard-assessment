import { NextResponse } from "next/server";
import { processData } from "@/lib/data";

export async function GET() {
  try {
    const records = await processData();

    // Calculate stats
    const totalVehicles = records.length;
    const avgRange = Math.round(
      records.reduce((sum, record) => sum + record.range, 0) / totalVehicles
    );

    const makeCount = new Map<string, number>();
    let cleanFuelVehicles = 0;

    records.forEach((record) => {
      makeCount.set(record.make, (makeCount.get(record.make) || 0) + 1);
      if (
        record.cleanFuelEligibility.includes(
          "Clean Alternative Fuel Vehicle Eligible"
        )
      ) {
        cleanFuelVehicles++;
      }
    });

    const topMake = [...makeCount.entries()].sort((a, b) => b[1] - a[1])[0][0];

    return NextResponse.json({
      totalVehicles,
      avgRange,
      topMake,
      cleanFuelVehicles,
    });
  } catch (error) {
    console.error("Error processing stats:", error);
    return NextResponse.json(
      { error: "Failed to process stats" },
      { status: 500 }
    );
  }
}
