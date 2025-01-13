import { NextResponse } from "next/server";
import { processData } from "@/lib/data";

const ITEMS_PER_PAGE = 10;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");

    const allData = await processData();

    // Calculate pagination
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const data = allData.slice(start, end);
    const totalPages = Math.ceil(allData.length / ITEMS_PER_PAGE);

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
