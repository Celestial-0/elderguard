"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useMemo, useId } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconThermometer,
  IconDroplet,
  IconFall,
  IconVolume,
  IconHeart,
} from "@tabler/icons-react";
import ThermometerUI from "./home/thermometerUI";
import OxygenUI from "./home/oxygenUI";
import MotionSwitch from "./home/MotionSwitch";
import Wave from "react-wavify";

interface LiveData {
  data: {
    temperature: number;
    SpO2: number;
    averageHeartRate: number;
    fireStatus: number;
    heartRate: number;
    humidity: number;
    motionDetected: number;
    soundLevel: number;
    timestamp: string;
    fallDetected: number;
  };
}

const DEMO_DATA: LiveData["data"] = {
  temperature: 25.6,
  SpO2: 93,
  averageHeartRate: 75,
  fireStatus: 0,
  heartRate: 70,
  humidity: 50,
  motionDetected: 0,
  soundLevel: 1450,
  timestamp: "2025-01-01T00:00:00.000Z",
  fallDetected: 0,
};

export function BentoGridUI({ demo = false }: { demo?: boolean }) {
  const [data, setData] = useState<LiveData["data"] | null>(null);
  const soundMaskId = useId();
  const heartMaskId = useId();

  useEffect(() => {
    if (demo) {
      setData(DEMO_DATA);
      return;
    }

    let isMounted = true;
    async function fetchLiveData() {
      try {
        const res = await fetch("/api/live");
        if (!res.ok) throw new Error("Network response was not ok");
        const json = await res.json();
        if (isMounted && json.success && json.data) {
          setData(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch live data:", err);
      }
    }

    fetchLiveData();
    return () => {
      isMounted = false;
    };
  }, [demo]);

  const items = useMemo(
    () => [
      {
        title: "Temperature",
        description: "Live temperature readings from the sensor in real-time.",
        header: <ThermometerUI temperature={data?.temperature ?? 0} />,
        icon: <IconThermometer className="h-4 w-4 text-neutral-500" />,
        colSpan: 1,
      },
      {
        title: "Oxygen Level (SpO2)",
        description: "Monitoring blood oxygen saturation for health analysis.",
        header: <OxygenUI spo2={data?.SpO2 ?? 0} />,
        icon: <IconDroplet className="h-4 w-4 text-neutral-500" />,
        colSpan: 1,
      },
      {
        title: "Fall Detection",
        description: "Detects sudden movements that indicate a potential fall.",
        header: <MotionSwitch data={data?.fallDetected ?? 0} />,
        icon: <IconFall className="h-4 w-4 text-neutral-500" />,
        colSpan: 1,
      },
      {
        title: `Sound Level: ${Math.round(data?.soundLevel ?? 0)} Db`,
        description: "Measures ambient noise levels to detect anomalies.",
        header: (
          <Wave mask={`url(#${soundMaskId})`} fill="#1277b0">
            <defs>
              <linearGradient id="gradient-sound" gradientTransform="rotate(90)">
                <stop offset="0" stopColor="white" />
                <stop offset="0.5" stopColor="black" />
              </linearGradient>
              <mask id={soundMaskId}>
                <rect x="0" y="0" width="2000" height="200" fill="url(#gradient-sound)" />
              </mask>
            </defs>
          </Wave>
        ),
        icon: <IconVolume className="h-4 w-4 text-neutral-500" />,
        colSpan: 2,
      },
      {
        title: `Heart Rate: ${data?.heartRate ?? 0} BPM`,
        description: "Visualizes live heart rate to track vital signs.",
        header: (
          <Wave
            fill="#e62315"
            mask={`url(#${heartMaskId})`}
            options={{ points: 3, speed: 0.3, amplitude: 100 }}
          >
            <defs>
              <mask id={heartMaskId}>
                <path
                  d="M10,35 A20,20,0,0,1,50,35 A20,20,0,0,1,90,35 Q90,65,50,95 Q10,65,10,35 Z"
                  fill="white"
                />
              </mask>
            </defs>
          </Wave>
        ),
        icon: <IconHeart className="h-4 w-4 text-neutral-500" />,
        colSpan: 1,
      },
    ],
    [data, soundMaskId, heartMaskId]
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <BentoGrid className="md:grid-cols-3 gap-6">
      {items.map((item, idx) => (
        <BentoGridItem
          key={idx}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={cn(
            idx === 3 ? `md:col-span-2` : `md:col-span-${item.colSpan}`,
            idx === 2 && "items-center pt-12",
            idx === 1 && "items-center pt-12",
            idx === 4 && "pt-12",
            idx === 0 && "flex"
          )}
        />
      ))}
    </BentoGrid>
  );
}