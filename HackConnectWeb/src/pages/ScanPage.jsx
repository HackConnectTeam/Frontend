import React from "react";
import { useNavigate } from 'react-router-dom';
import QRScanner from '../components/QRScanner';
import Header from '../components/static/Header';
import RealService from '../services/RealService';

const ScanPage = () => {
  const navigate = useNavigate();

  const handleScan = async (userId) => {
    try {
      await RealService.getUser(userId)
        .then((exists) => {
          if (exists) {
            // If the user exists, navigate to their page
            navigate(`/user/${encodeURIComponent(userId)}`);
          } else {
            // If the user does not exist, create a new user
            createUser(userId);
          }
        });
      } catch (error) {
        try {
          createUser(userId);
        } catch (error) {
          Toast.error("Error when creating the user. Please, try it again.");
        }

        // Navigate to the user page
        navigate(`/user/${encodeURIComponent(userId)}`);
      }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-surface rounded-2xl shadow p-6 w-full max-w-md text-text-main">
          <QRScanner onScan={handleScan} />
        </div>
      </main>

      <footer className="bg-secondary text-white p-4 text-center text-sm">
        <p>Focus the QR Code inside the scan area</p>
      </footer>
    </div>
  );
};

export default ScanPage;
