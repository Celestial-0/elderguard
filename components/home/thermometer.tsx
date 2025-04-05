import React from "react";
import { motion } from "framer-motion";

interface ThermometerProps {
  temperature?: number;
  minTemp?: number;
  maxTemp?: number;
}

const getColor = (temp: number): string => {
  if (temp < 0) return "bg-blue-500";
  if (temp < 25) return "bg-green-500";
  if (temp < 35) return "bg-yellow-400";
  return "bg-red-500";
};

const Thermometer: React.FC<ThermometerProps> = ({
  temperature = 20,
  minTemp = -20,
  maxTemp = 50,
}) => {
  const totalRange = maxTemp - minTemp;
  const clampedTemp = Math.min(Math.max(temperature, minTemp), maxTemp);
  const percentage = ((clampedTemp - minTemp) / totalRange) * 100;

  return (
    <div className="w-16 h-52 flex flex-col items-center justify-end">
      {/* Outer tube */}
      <div className="relative w-8 h-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-md">
        {/* Mercury level */}
        <motion.div
          className={`absolute bottom-0 w-full ${getColor(clampedTemp)}`}
          style={{ height: `${percentage}%` }}
          initial={{ height: 0 }}
          animate={{ height: `${percentage}%` }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Bulb */}
      <div
        className={`w-10 h-10 mt-2 rounded-full ${getColor(
          clampedTemp
        )} shadow-lg border-4 border-gray-300 dark:border-gray-600`}
      />

      {/* Label */}
      <div className="mt-2 text-center text-sm text-gray-800 dark:text-gray-200">
        {clampedTemp}°C
      </div>
    </div>
  );
};

export default Thermometer;
