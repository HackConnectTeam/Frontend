import { QrReader } from 'react-qr-reader';
import { useState, useEffect } from 'react';

const QRScanner = ({ onScan }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraDevices, setCameraDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');

  useEffect(() => {
    // Verify permissions and list available cameras
    const checkPermissions = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setCameraDevices(videoDevices);

        if (videoDevices.length > 0) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        }

        // Request permissions explicitly
        await navigator.mediaDevices.getUserMedia({ video: true });
        setHasPermission(true);
      } catch (err) {
        console.error("Error al acceder a la cámara:", err);
        setHasPermission(false);
      }
    };

    checkPermissions();
  }, []);

  if (hasPermission === null) {
    return <div className="text-center p-4">Checking camera permissions</div>;
  }

  if (hasPermission === false) {
    return (
      <div className="text-center p-4 text-red-500">
        Permissions to access the camera are required to use this feature. Please, enable them in your browser settings.
      </div>
    );
  }

  if (cameraDevices.length === 0) {
    return <div className="text-center p-4">There were no cameras found</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative aspect-square overflow-hidden rounded-lg border-2 border-blue-400">
        <QrReader
          constraints={{
            deviceId: selectedDeviceId,
            facingMode: 'environment'
          }}
          onResult={(result) => {
            if (result) {
              onScan(result.text);
            }
          }}
          videoId="qr-video"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">Scan your QR Code</p>
      </div>
    </div>
  );
};

export default QRScanner;
