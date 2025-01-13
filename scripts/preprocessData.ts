import { promises as fs } from "fs";
import path from "path";
import { parse } from "csv-parse";

// Define EVRecord type inline since we can't use relative imports in scripts
type EVRecord = {
  vin: string;
  county: string;
  city: string;
  state: string;
  postalCode: string;
  modelYear: number;
  make: string;
  model: string;
  electricType: string;
  cleanFuelEligibility: string;
  range: number;
  baseMSRP: string;
  legislativeDistrict: string;
  vehicleId: string;
  location: string;
  utility: string;
  censusTract: string;
};

async function processCSV() {
  try {
    const csvPath = path.join(
      process.cwd(),
      "data-to-visualize",
      "Electric_Vehicle_Population_Data.csv"
    );
    const outputDir = path.join(process.cwd(), "public", "data");

    // Create both directories if they don't exist
    await fs.mkdir(outputDir, { recursive: true });

    console.log("Reading CSV file...");
    const fileContent = await fs.readFile(csvPath, "utf-8");
    const records: EVRecord[] = [];

    console.log("Parsing CSV data...");
    const parser = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    for await (const record of parser) {
      records.push({
        vin: record["VIN (1-10)"] || "",
        county: record.County || "",
        city: record.City || "",
        state: record.State || "",
        postalCode: record["Postal Code"] || "",
        modelYear: parseInt(record["Model Year"]) || 0,
        make: record.Make || "",
        model: record.Model || "",
        electricType: record["Electric Vehicle Type"] || "",
        cleanFuelEligibility:
          record["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] || "",
        range: parseInt(record["Electric Range"]) || 0,
        baseMSRP: record["Base MSRP"] || "",
        legislativeDistrict: record["Legislative District"] || "",
        vehicleId: record["DOL Vehicle ID"] || "",
        location: record.Location || "",
        utility: record["Electric Utility"] || "",
        censusTract: record["Census Tract"] || "",
      });

      if (records.length % 1000 === 0) {
        console.log(`Processed ${records.length} records...`);
      }
    }

    console.log("Writing JSON file...");
    await fs.writeFile(
      path.join(outputDir, "vehicles.json"),
      JSON.stringify(records)
    );

    console.log(`Successfully processed ${records.length} records`);
  } catch (error) {
    console.error("Error processing CSV:", error);
    process.exit(1);
  }
}

processCSV();
