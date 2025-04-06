"use client";

import { useEffect, useState } from "react";
import { OxygenPercent } from "@/components/home/oxygen";

interface OxygenUIProps {
  spo2: number;
}

export default function OxygenUI({ spo2 }: OxygenUIProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(spo2);
  }, [spo2]);

  return (
    <div className="flex flex-col items-center justify-center">
      <OxygenPercent
        max={100}
        min={0}
        value={value}
        gaugePrimaryColor="rgb(79 70 229)"
        gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
      />
    </div>
  );
}
