import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import QRScanner from '../components/QRScanner';
import Header from '../components/static/Header';

const ScanPage = () => {
  const navigate = useNavigate();

  const handleScan = (userId) => {
    navigate(`/user/${encodeURIComponent(userId)}`);
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
        <p>Enfoca el código QR dentro del área de escaneo</p>
      </footer>
    </div>
  );
};

export default ScanPage;
