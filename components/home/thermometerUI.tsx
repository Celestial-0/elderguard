// App.jsx
import React, { useState } from "react";
import Thermometer from "./thermometer";

export default function ThermometerUI() {
  const [temp, setTemp] = useState(30);

  return (
    <div className="flex flex-col items-center justify-center">
      <Thermometer temperature={temp} />
    </div>
  );
}
