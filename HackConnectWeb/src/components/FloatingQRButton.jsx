import { useState } from 'react';
import QRScanner from './QRScanner';

const FloatingQRButton = ({ onScan }) => {
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = (data) => {
    setShowScanner(false);
    onScan(data);
  };

  return (
    <>
      {!showScanner && (
        <button
          onClick={() => setShowScanner(true)}
          className="fixed bottom-6 right-6 bg-primary text-white w-14 h-14 rounded-full shadow-lg text-3xl flex items-center justify-center hover:bg-primary/90 transition"
          aria-label="Scan your QR"
        >
          +
        </button>
      )}

      {showScanner && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <QRScanner onScan={handleScan} />
            <button
              onClick={() => setShowScanner(false)}
              className="mt-4 block mx-auto text-sm text-white hover:underline"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingQRButton;
