import React from "react";
import { useNavigate } from 'react-router-dom';
import QRScanner from '../components/QRScanner';
import Header from '../components/static/Header';
import RealService from '../services/RealService';
import { saveUserId } from '../utils/auth';

const ScanPage = () => {
  const navigate = useNavigate();

  const handleScanSuccess = (userId) => {
    saveUserId(userId);
    navigate(`/user/${encodeURIComponent(userId)}`);
  };

  const handleScan = async (userId) => {
    try {
      // Check if the user exists
      const existenceCheck = await RealService.userExists(userId);

      if (existenceCheck.exists) {
        // If the user exists, login
        handleScanSuccess(userId);
      } else {
        // If the user does not exist, create a new user
        try {
          await RealService.createUser({ id: userId });
          handleScanSuccess(userId);
        } catch (createError) {
          Toast.error("Error when creating the user. Please, try again.");
        }
      }
    } catch (error) {
      Toast.error("Error scanning user. Please, try again.");
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
