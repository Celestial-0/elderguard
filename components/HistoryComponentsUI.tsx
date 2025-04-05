"use client";

import React, { useState, useEffect } from "react";
import { DateRangePicker } from "@heroui/react";
import {
  parseAbsoluteToLocal,
  CalendarDateTime,
  getLocalTimeZone,
  toCalendarDateTime,
} from "@internationalized/date";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
} from "@heroui/react";
import { useAsyncList } from "@react-stately/data";

// Utility: Converts "YYYY-MM-DD_HH-MM-SS" → Date object
function parseCustomStringToDate(dateStr: string): Date {
  const [datePart, timePart] = dateStr.split("_");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes, seconds] = timePart.split("-").map(Number);
  return new Date(year, month - 1, day, hours, minutes, seconds);
}

// Utility: Converts Date → "YYYY-MM-DD_HH-MM-SS"
function formatDateToCustomString(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}_${pad(
    date.getHours()
  )}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`;
}

// Utility: Converts custom string → CalendarDateTime
function customStringToCalendarDateTime(dateStr: string): CalendarDateTime {
  const date = parseCustomStringToDate(dateStr);
  return toCalendarDateTime(parseAbsoluteToLocal(date.toISOString()));
}

// Utility: Converts CalendarDateTime → custom string
function calendarDateTimeToCustomString(dt: CalendarDateTime): string {
  const date = dt.toDate(getLocalTimeZone());
  return formatDateToCustomString(date);
}

export default function DateTimeRangeTableUI() {
  const [fromtime, setFromTime] = useState("");
  const [totime, setToTime] = useState("");

  useEffect(() => {
    if (!fromtime) {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
      setFromTime(formatDateToCustomString(tenMinutesAgo));
    }
    if (!totime) {
      const now = new Date();
      setToTime(formatDateToCustomString(now));
    }
  }, [fromtime, totime]);

  const valid = fromtime !== "" && totime !== "";
  const defaultCalendarDateTime = customStringToCalendarDateTime(formatDateToCustomString(new Date()));

  const startValue = valid ? customStringToCalendarDateTime(fromtime) : defaultCalendarDateTime;
  const endValue = valid ? customStringToCalendarDateTime(totime) : defaultCalendarDateTime;

  const list = useAsyncList<any>({
    async load({ signal }) {
      if (!valid) return { items: [] };
      const url = `/api/history?from=${fromtime}&to=${totime}`;
      try {
        const res = await fetch(url, { signal });
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          console.log(json.data);
          return { items: json.data };
        }
        return { items: [] };
      } catch (error) {
        console.error("Fetch error:", error);
        return { items: [] };
      }
    },

  
    async sort({ items, sortDescriptor }) {
      const sorted = [...items].sort((a, b) => {
        const key = sortDescriptor.column as keyof typeof a;
        const valA = a[key];
        const valB = b[key];
        const isNumber = typeof valA === "number" && typeof valB === "number";
        let cmp = isNumber
          ? (valA as number) - (valB as number)
          : String(valA).localeCompare(String(valB));
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
      return { items: sorted };
    },
  });

  useEffect(() => {
    if (valid) {
      list.reload();
    }
  }, [fromtime, totime, valid]);

  return (
    <div >
      <DateRangePicker
        label="Select date range"
        labelPlacement="outside"
        value={{
          start: startValue,
          end: endValue,
        }}
        onChange={(val) => {
          if (val?.start) {
            setFromTime(calendarDateTimeToCustomString(val.start));
          }
          if (val?.end) {
            setToTime(calendarDateTimeToCustomString(val.end));
          }
        }}
      />

      <Table
        aria-label="Sensor data table"
        classNames={{ table: "min-h-[40px]" }}
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
      >
        <TableHeader>
          <TableColumn key="timestamp" allowsSorting>Timestamp</TableColumn>
          <TableColumn key="temperature" allowsSorting>Temp (°C)</TableColumn>
          <TableColumn key="humidity" allowsSorting>Humidity (%)</TableColumn>
          <TableColumn key="heartRate" allowsSorting>Heart Rate</TableColumn>
          <TableColumn key="SpO2" allowsSorting>SpO₂ (%)</TableColumn>
          <TableColumn key="averageHeartRate" allowsSorting>Avg HR</TableColumn>
          <TableColumn key="IR" allowsSorting>IR</TableColumn>
          <TableColumn key="Red" allowsSorting>Red</TableColumn>
          <TableColumn key="soundLevel" allowsSorting>Sound (dB)</TableColumn>
          <TableColumn key="motionDetected" allowsSorting>Motion</TableColumn>
          <TableColumn key="fireStatus" allowsSorting>Fire</TableColumn>
        </TableHeader>

        <TableBody
          isLoading={list.isLoading}
          items={list.items}
          loadingContent={<Spinner label="Loading sensor data..." />}
          emptyContent={"No data found for this time range."}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey) ?? "N/A"}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
