import { promises as fs } from "fs";
import path from "path";
import { parse } from "csv-parse";

export async function processData() {
  try {
    const csvPath = path.join(
      process.cwd(),
      "data-to-visualize",
      "Electric_Vehicle_Population_Data.csv"
    );
    const fileContent = await fs.readFile(csvPath, "utf-8");
    const records = [];

    const parser = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    for await (const record of parser) {
      records.push({
        make: record.Make || "",
        model: record.Model || "",
        modelYear: parseInt(record["Model Year"]) || 0,
        electricType: record["Electric Vehicle Type"] || "",
        cleanFuelEligibility:
          record["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] || "",
        range: parseInt(record["Electric Range"]) || 0,
        baseMSRP: record["Base MSRP"] || "",
        state: record.State || "",
        city: record.City || "",
      });
    }

    return records;
  } catch (error) {
    console.error("Error processing data:", error);
    return [];
  }
}
