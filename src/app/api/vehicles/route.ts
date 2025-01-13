import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { EVRecord } from "@/types";

const ITEMS_PER_PAGE = 10;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");

    // Read all vehicle data
    const jsonDirectory = path.join(process.cwd(), "public/data");
    const filePath = path.join(jsonDirectory, "vehicles.json");

    console.log("Looking for file at:", filePath);

    // Check if file exists
    try {
      await fs.access(filePath);
      console.log("File exists");
    } catch {
      console.error("vehicles.json not found at:", filePath);
      return NextResponse.json(
        { error: "Data not available" },
        { status: 404 }
      );
    }

    const fileContents = await fs.readFile(filePath, "utf8");
    const allData: EVRecord[] = JSON.parse(fileContents);

    console.log("Total records:", allData.length);

    // Calculate pagination
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const data = allData.slice(start, end);
    const totalPages = Math.ceil(allData.length / ITEMS_PER_PAGE);

    console.log(`Serving page ${page} of ${totalPages}, ${data.length} items`);

    return NextResponse.json({
      data,
      page,
      totalPages,
    });
  } catch (error) {
    console.error("Error loading vehicle data:", error);
    return NextResponse.json(
      { error: "Failed to load vehicle data" },
      { status: 500 }
    );
  }
}
