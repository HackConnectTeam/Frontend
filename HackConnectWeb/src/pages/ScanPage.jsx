import { useNavigate } from 'react-router-dom';
import QRScanner from '../components/QRScanner';

const ScanPage = () => {
  const navigate = useNavigate();

  const handleScan = (userId) => {
    navigate(`/user/${encodeURIComponent(userId)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold text-center">QR Scanner</h1>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <QRScanner onScan={handleScan} />
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center text-sm">
        <p>Focus the QR code within the scanning area</p>
      </footer>
    </div>
  );
};

export default ScanPage;
