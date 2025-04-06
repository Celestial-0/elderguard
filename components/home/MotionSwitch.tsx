import React from "react";

export default function MotionSwitch({ data }: { data: number }) {
  const isFallDetected = data === 1;
  const backgroundColor = isFallDetected ? "red" : "green";
  const message = isFallDetected ? "Fall Detected" : "No Fall Detected";

  return (
    <div 
      role="status"
      aria-label={message}
      style={{
        backgroundColor,
        color: "white",
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontWeight: "bold",
        padding: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      <span>{message}</span>
    </div>
  );
}
