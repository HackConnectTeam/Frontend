// src/components/QRScanner.jsx
import React from "react";
import { useZxing } from "react-zxing";

const QRScanner = ({ onScan }) => {
  const { ref } = useZxing({
    onDecodeResult(result) {
      onScan(result.getText());
    },
    constraints: {
      video: {
        facingMode: { ideal: "environment" },
      },
    },
  });

  return (
    <div className="w-full">
      <video
        ref={ref}
        className="rounded-xl w-full h-auto shadow"
        autoPlay
        muted
        playsInline
      />
    </div>
  );
};

export default QRScanner;
