"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { EVRecord } from "@/types";

const TABLE_HEADERS = [
  { key: "make", label: "Make" },
  { key: "model", label: "Model" },
  { key: "modelYear", label: "Year" },
  { key: "electricType", label: "Type" },
  { key: "range", label: "Range" },
  { key: "cleanFuelEligibility", label: "Clean Fuel" },
  { key: "baseMSRP", label: "MSRP" },
  { key: "state", label: "State" },
  { key: "city", label: "City" },
] as const;

export default function DataTable() {
  const parentRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<EVRecord[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let mounted = true;

    async function fetchPage() {
      try {
        setLoading(true);
        const res = await fetch(`/api/vehicles?page=${page}`);
        const json = await res.json();

        if (!mounted) return;

        if (json.data) {
          setData(json.data);
          setTotalPages(json.totalPages);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchPage();
    return () => {
      mounted = false;
    };
  }, [page]);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
    overscan: 5,
  });

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-4">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <Fragment>
      <div ref={parentRef} className="max-h-[400px] overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              {TABLE_HEADERS.map((header) => (
                <TableHead
                  key={header.key}
                  className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 &&
              rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const vehicle = data[virtualRow.index];
                return (
                  <TableRow
                    key={virtualRow.index}
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    className="hover:bg-gray-50"
                  >
                    <TableCell className="text-sm text-gray-500">
                      {vehicle.make}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {vehicle.model}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {vehicle.modelYear}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {vehicle.electricType}
                    </TableCell>
                    <TableCell className="text-sm text-gray-900 font-medium">
                      {vehicle.range} miles
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          vehicle.cleanFuelEligibility.includes(
                            "Clean Alternative Fuel Vehicle Eligible"
                          )
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {vehicle.cleanFuelEligibility.includes(
                          "Clean Alternative Fuel Vehicle Eligible"
                        )
                          ? "Eligible"
                          : "Not Eligible"}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-900 font-medium">
                      ${vehicle.baseMSRP}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {vehicle.state}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {vehicle.city}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= totalPages}
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </Fragment>
  );
}
