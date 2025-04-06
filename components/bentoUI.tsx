"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
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

export function BentoGridUI() {
  const [data, setData] = useState<LiveData["data"] | null>(null);
  // const [soundLevel, setSoundLevel] = useState("0");

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const response = await fetch("/api/live");
        if (!response.ok) throw new Error("Network response was not ok");

        const json = await response.json();
        if (json.success && json.data) {
          setData(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch live data:", error);
      }
    };

    fetchLiveData();
  }, []);

  // useEffect(() => {
  //   if (data?.soundLevel !== undefined) {
  //     const raw = data.soundLevel / 1023;
  //     const decibel = 20 * Math.log10(raw);
  //     setSoundLevel(Number.isFinite(decibel) ? decibel.toFixed(2) : "0");
  //   }
  // }, [data?.soundLevel]);

  const items = [
    {
      title: "Temperature",
      description: "Live temperature readings from the sensor in real-time.",
      header: <ThermometerUI temperature={data?.temperature ?? 0} />,
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Oxygen Level (SpO2)",
      description: "Monitoring blood oxygen saturation for health analysis.",
      header: <OxygenUI spo2={data?.SpO2 ?? 0.0} />,
      icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Fall Detection",
      description: "Detects sudden movements that indicate a potential fall.",
      header: <MotionSwitch data={data?.fallDetected ?? 0} />,
      icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: `Sound Level: ${data?.soundLevel ?? 0} Hz`,
      description: "Measures ambient noise levels to detect anomalies.",
      header: (
        <Wave mask="url(#mask)" fill="#1277b0">
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
              <stop offset="0" stopColor="white" />
              <stop offset="0.5" stopColor="black" />
            </linearGradient>
            <mask id="mask">
              <rect x="0" y="0" width="2000" height="200" fill="url(#gradient)" />
            </mask>
          </defs>
        </Wave>
      ),
      icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: `Heart Rate Monitor ${(parseInt(data?.heartRate?.toString() ?? "0"))} BPM`,
      description: "Visualizes live heart rate to track vital signs.",
      header: (
        <Wave
          fill="#e62315"
          mask="url(#mask-heart)"
          options={{ points: 3, speed: 0.3, amplitude: 100 }}
        >
          <mask id="mask-heart">
            <path
              d="M10,35 A20,20,0,0,1,50,35 A20,20,0,0,1,90,35 Q90,65,50,95 Q10,65,10,35 Z"
              fill="white"
            />
          </mask>
        </Wave>
      ),
      icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
  ];


  return (
    <BentoGrid className="md:grid-cols-3 gap-6">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={`${
            i === 3
              ? "md:col-span-2"
              : i === 2 
              ? "items-center pt-12"
              : i === 1 
              ? "items-center pt-12"
              : i === 4 
              ? "pt-12"
              : "flex"
          }`}
          
          
          
        />
      ))}
    </BentoGrid>
  );
}

// const Skeleton = () => (
//   <div className="flex flex-1 w-full h-full animate-pulse rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
// );
