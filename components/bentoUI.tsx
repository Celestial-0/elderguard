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
  };
}

export function BentoGridUI() {
  const [data, setData] = useState<LiveData["data"] | null>(null);

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

  const items = [
    {
      title: "Temperature",
      description: "Explore the birth of groundbreaking ideas and inventions.",
      header: <ThermometerUI temperature={data?.temperature ?? 0} />,
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "Oxygen level",
      description: "Dive into the transformative power of technology.",
      header: <OxygenUI spo2={data?.SpO2 ?? 0.00} />,
      icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Art of Design",
      description: "Discover the beauty of thoughtful and functional design.",
      header: <Skeleton />,
      icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Power of Communication",
      description: "Understand the impact of effective communication in our lives.",
      header: <Skeleton />,
      icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Pursuit of Knowledge",
      description: "Join the quest for understanding and enlightenment.",
      header: <Skeleton />,
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
          className={i === 3 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full animate-pulse rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
