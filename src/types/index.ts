export type EVRecord = {
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

export type ChartData = {
  makeModel: { labels: string[]; data: number[] };
  yearlyTrend: { labels: string[]; data: number[] };
  makeDistribution: { labels: string[]; data: number[] };
  rangeYear: Array<{ x: number; y: number }>;
  cleanFuel: {
    labels: string[];
    datasets: Array<{ label: string; data: number[]; backgroundColor: string }>;
  };
};

export type Stats = {
  totalVehicles: number;
  avgRange: number;
  topMake: string;
  cleanFuelVehicles: number;
};

export type TransactionRecord = {
  merchantName: string;
  dateTime: string;
  refId: string;
  orderNo: string;
  amount: string;
  gatewayName: string;
  status: "Success" | "Pending" | "Failed";
};

export type APIResponse = {
  data: TransactionRecord[];
  totalPages: number;
  totalRecords: number;
  currentPage: number;
};
