import { Html5QrcodeScanner, Html5QrcodeScanType, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { useEffect, useRef } from 'react';

const QRScanner = ({ onScan }) => {
  const scannerRef = useRef(null);
  const qrScannerRef = useRef(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    // Configuración del scanner
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      rememberLastUsedCamera: true,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]
    };

    // Inicializar scanner
    qrScannerRef.current = new Html5QrcodeScanner(
      scannerRef.current.id,
      config,
      false // verbose (mostrar logs en consola)
    );

    // Manejar escaneos exitosos
    const onScanSuccess = (decodedText, decodedResult) => {
      onScan(decodedText);
    };

    // Manejar errores
    const onScanError = (error) => {
      console.warn('QR Scan error:', error);
    };

    // Renderizar scanner
    qrScannerRef.current.render(onScanSuccess, onScanError);

    // Limpieza al desmontar
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
        <p className="text-sm text-gray-600">Escanea el código QR del usuario</p>
      </div>
    </div>
  );
};

export default QRScanner;
