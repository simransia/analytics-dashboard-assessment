import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import type { Stats } from "@/types";

let STATS_CACHE: Stats | null = null;

export async function GET() {
  try {
    if (!STATS_CACHE) {
      const statsPath = path.join(
        process.cwd(),
        "public",
        "data",
        "stats.json"
      );

      try {
        await fs.access(statsPath);
      } catch {
        throw new Error(
          "Stats file not found. Please run 'npm run preprocess' first."
        );
      }

      const rawData = await fs.readFile(statsPath, "utf-8");
      STATS_CACHE = JSON.parse(rawData);
    }

    return NextResponse.json(STATS_CACHE);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to fetch stats",
      },
      { status: 500 }
    );
  }
}
