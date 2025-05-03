import { Html5QrcodeScanner, Html5QrcodeScanType, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { useEffect, useRef } from 'react';

const QRScanner = ({ onScan }) => {
  const scannerRef = useRef(null);
  const qrScannerRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    // Scanner configuration
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      rememberLastUsedCamera: true,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
    };

    // Initialize the scanner
    qrScannerRef.current = new Html5QrcodeScanner(
      scannerRef.current.id,
      config,
      false
    );

    const onScanSuccess = (decodedText, decodedResult) => {
      onScan(decodedText);
    };

    const onScanError = (error) => {
      console.warn('QR Scan error:', error);
    };

    // Function to select the back camera
    const startScannerWithBackCamera = async () => {
      try {
        const cameras = await Html5Qrcode.getCameras();
        if (cameras && cameras.length > 1) {
          // Find the back camera (usually the second one on mobile devices)
          const backCamera = cameras.find(
            (camera) => camera.label.includes("back") || camera.label.includes("rear")
          ) || cameras[1]; // If a back camera is found, start the scanner with it

          if (backCamera) {
            await qrScannerRef.current.start(
              backCamera.id,
              { fps: config.fps, qrbox: config.qrbox },
              onScanSuccess,
              onScanError
            );
            return;
          }
        }

        // If no back camera is found, start with the default one
        qrScannerRef.current.render(onScanSuccess, onScanError);
      } catch (err) {
        console.error("Error al acceder a las cámaras:", err);
        qrScannerRef.current.render(onScanSuccess, onScanError);
      }
    };

    startScannerWithBackCamera();

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.clear().catch(error => {
          console.error("Failed to clear html5 qrcode scanner", error);
        });
      }
    };
  }, [onScan]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        ref={scannerRef}
        id="html5qr-scanner"
        className="w-full aspect-square rounded-lg overflow-hidden border-2 border-blue-400"
      />
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">Scan your QR Code</p>
      </div>
    </div>
  );
};

export default QRScanner;
