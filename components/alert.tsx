"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";
import { formatDistanceToNow } from "date-fns";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  timestamp: string;
  warningType: 'fall' | 'fire' | 'sos' | 'other';
}

const Notification = ({ name, description, icon, color, timestamp }: Item) => {
  const [timeAgo, setTimeAgo] = useState("Just now");

  useEffect(() => {
    const updateTime = () => {
      try {
        if (!timestamp) return setTimeAgo("Unknown time");
    
        // Convert `2025-04-26_01-22-07` → `2025-04-26T01:22:07`
        const safeTimestamp = timestamp.replace("_", "T").replace(/-/g, ":").replace("T", "T").replace(/^(.+T\d{2}):(\d{2}):(\d{2})$/, "$1:$2:$3");
    
        const isoTimestamp = timestamp.replace("_", "T").replace(/-/g, ":").replace(/^(\d{4}:\d{2}:\d{2})T(\d{2}):(\d{2}):(\d{2})$/, (_, date, h, m, s) =>
          `${date.replace(/:/g, "-")}T${h}:${m}:${s}`
        );
    
        const date = new Date(isoTimestamp);
        if (isNaN(date.getTime())) return setTimeAgo("Invalid time");
    
        const formatted = formatDistanceToNow(date, { addSuffix: true });
        setTimeAgo(formatted);
      } catch (err) {
        console.error("Time formatting error:", err);
        setTimeAgo("Invalid time");
      }
    };
    

    updateTime();
    const interval = setInterval(updateTime, 3000); // update every minute
    return () => clearInterval(interval);
  }, [timestamp]);

  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{timeAgo}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListUI({ className }: { className?: string }) {
  const [notifications, setNotifications] = useState<Item[]>([]);
  const lastData = useRef<any>({});
  const emailSentRef = useRef<Record<string, boolean>>({});

  // Function to send email notification
  const sendEmailNotification = async (notification: Item) => {
    try {
      const emailKey = `${notification.warningType}_${notification.timestamp}`;
      
      // Only send email once per warning event
      if (emailSentRef.current[emailKey]) {
        return;
      }
      
      const recipientEmail = localStorage.getItem('elderguard_email') || '';
      const recipientName = localStorage.getItem('elderguard_name') || 'Caregiver';
      
      if (!recipientEmail) {
        console.warn('No recipient email configured for alerts');
        return;
      }

      // Use the consistent email API endpoint
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: recipientEmail,
          subject: `ElderGuard Alert: ${notification.name}`,
          userName: recipientName,
          message: notification.description,
          warningType: notification.warningType,
        }),
      });

      if (response.ok) {
        console.log(`Email notification sent for ${notification.warningType}`);
        emailSentRef.current[emailKey] = true;
      } else {
        const errorData = await response.json();
        console.error('Failed to send email notification:', errorData.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error sending email notification:', error);
    }
  };

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const res = await fetch("/api/live");
        if (!res.ok) throw new Error("Failed to fetch");

        const json = await res.json();
        const data = json.data;

        if (
          data.fallDetected !== lastData.current.fallDetected ||
          data.fireStatus !== lastData.current.fireStatus ||
          data.touchSOS !== lastData.current.touchSOS
        ) {
          lastData.current = data;

          const timestamp = data.timestamp ?? new Date().toISOString().replace("T", "_");

          const newNotifications: Item[] = [];

          if (data.fireStatus) {
            const fireNotification = {
              name: "Fire warning",
              description: "A fire has been detected in the vicinity.",
              icon: "🔥",
              color: "#FF7043",
              timestamp,
              warningType: 'fire' as const,
            };
            newNotifications.push(fireNotification);
            sendEmailNotification(fireNotification);
          }
          if (data.fallDetected) {
            const fallNotification = {
              name: "Fall Detected",
              description: "A fall has been detected.",
              icon: "🤕",
              color: "#FFC107",
              timestamp,
              warningType: 'fall' as const,
            };
            newNotifications.push(fallNotification);
            sendEmailNotification(fallNotification);
          }
          if (data.touchSOS) {
            const sosNotification = {
              name: "SOS Detected",
              description: "An SOS signal has been triggered.",
              icon: "🚨",
              color: "#1E88E5",
              timestamp,
              warningType: 'sos' as const,
            };
            newNotifications.push(sosNotification);
            sendEmailNotification(sosNotification);
          }

          setNotifications(newNotifications);
        }
      } catch (err) {
        console.error("Live fetch failed:", err);
      }
    };

    fetchLiveData();
    const interval = setInterval(fetchLiveData, 5000); // poll every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "relative flex h-[100px] w-fit flex-col overflow-hidden p-2",
        className
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification key={idx} {...item} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
}
