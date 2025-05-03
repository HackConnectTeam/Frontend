import React, { useState } from "react";
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
            // Si el usuario ya existe, navegar a su página
            navigate(`/user/${encodeURIComponent(userId)}`);
          } else {
            // Si el usuario no existe, crear uno nuevo
            createUser(userId);
          }
        });
      } catch (error) {
        // Crear usuario con los datos mínimos
        try {
          await RealService.createUser({
            id: userId
          });
        } catch (error) {
          console.error("Error al crear usuario:", error);
          Toast.error("Error al crear usuario. Por favor, inténtalo de nuevo.");
        }

        // Navegar a la página del usuario
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
        <p>Enfoca el código QR dentro del área de escaneo</p>
      </footer>
    </div>
  );
};

export default ScanPage;
