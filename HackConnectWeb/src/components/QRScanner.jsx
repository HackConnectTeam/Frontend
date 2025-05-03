import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRScanner = ({ onScan }) => {
  const qrCodeRegionId = 'html5qr-code-full-region';
  const html5QrCodeRef = useRef(null);
  const scannerRunningRef = useRef(false);

  useEffect(() => {
    const element = document.getElementById(qrCodeRegionId);
    if (!element) {
      console.error(`Element with ID '${qrCodeRegionId}' not found.`);
      return;
    }

    html5QrCodeRef.current = new Html5Qrcode(qrCodeRegionId);

    const config = {
      fps: 10,
      qrbox: 250
    };

    Html5Qrcode.getCameras()
      .then(devices => {
        const backCamera = devices.find(device =>
          device.label.toLowerCase().includes('back') ||
          device.label.toLowerCase().includes('trasera') ||
          device.label.toLowerCase().includes('rear')
        );

        const cameraId = backCamera ? backCamera.id : devices[0]?.id;

        if (!cameraId) {
          console.error('No camera found');
          return;
        }

        html5QrCodeRef.current.start(
          cameraId,
          config,
          decodedText => {
            if (scannerRunningRef.current) {
              scannerRunningRef.current = false;
              onScan(decodedText);
              html5QrCodeRef.current.stop().then(() => {
                html5QrCodeRef.current.clear();
              }).catch(err => {
                console.error('Failed to stop QR scanner after scan', err);
              });
            }
          },
          errorMessage => {
            // Optional: console.warn(errorMessage);
          }
        ).then(() => {
          scannerRunningRef.current = true;
        });
      })
      .catch(err => {
        console.error('Error getting cameras', err);
      });

    return () => {
      if (scannerRunningRef.current && html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().then(() => {
          html5QrCodeRef.current.clear();
          scannerRunningRef.current = false;
        }).catch(err => {
          console.error('Failed to stop QR scanner on cleanup', err);
        });
      }
    };
  }, [onScan]);

  return (
    <div id={qrCodeRegionId} className="rounded-xl shadow-md w-full max-w-md mx-auto" />
  );
};

export default QRScanner;
