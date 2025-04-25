import { Meteors } from "@/components/magicui/meteors";

import React from "react";

export default function MeteorUI() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden cursor-pointer">
      <Meteors />
    </div>
  );
}
