import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const UserPage = () => {
  const { userId } = useParams();
  const [qrData, setQrData] = useState('');

  useEffect(() => {
    if (userId) {
      setQrData(decodeURIComponent(userId));
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold text-center">Welcome</h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
          <h2 className="text-lg font-semibold mb-4">Your identifier is:</h2>
          <p className="text-blue-600 font-mono bg-gray-100 p-2 rounded break-all mb-6">
            {qrData}
          </p>

          <div className="bg-white p-4 border border-gray-300 rounded inline-block">
            {/* Use a library like qrcode.react */}
            <div className="w-32 h-32 bg-gray-200 flex items-center justify-center mx-auto mb-2">
              [QR Code]
            </div>
            <p className="text-xs text-gray-600">User QR Code</p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center text-sm">
        <p>Save this code for future identifications</p>
      </footer>
    </div>
  );
};

export default UserPage;
