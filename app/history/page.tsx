"use client";

import { title } from "@/components/primitives";
import DateTimeRangePickerUI from "@/components/HistoryComponentsUI";


export default function HistoryPage() {
  return (
    <>
      <div className="inline-block text-center justify-center">
        <h1 className={title()}>History</h1>
      </div>

      <DateTimeRangePickerUI />
    </>
  );
}
