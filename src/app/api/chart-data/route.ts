import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import type { ChartData } from "@/types";

let CHART_DATA_CACHE: ChartData | null = null;

export async function GET() {
  try {
    if (!CHART_DATA_CACHE) {
      const chartDataPath = path.join(
        process.cwd(),
        "public",
        "data",
        "chart-data.json"
      );

      try {
        await fs.access(chartDataPath);
      } catch {
        throw new Error(
          "Chart data file not found. Please run 'npm run preprocess' first."
        );
      }

      const rawData = await fs.readFile(chartDataPath, "utf-8");
      CHART_DATA_CACHE = JSON.parse(rawData);
    }

    return NextResponse.json(CHART_DATA_CACHE);
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch chart data",
      },
      { status: 500 }
    );
  }
}
