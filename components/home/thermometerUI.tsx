// App.jsx
import React, { useEffect, useState } from "react";
import Thermometer from "./thermometer";

interface ThermometerUIProps {
  temperature: number;
}

export default function ThermometerUI({ temperature }: ThermometerUIProps) {
  const [temp, setTemp] = useState(0);

  useEffect(() => {
      setTemp(temperature);
    }, [temperature]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Thermometer temperature={temp} />
    </div>
  );
}
