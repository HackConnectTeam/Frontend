import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import Header from '../components/static/Header';
import ParticipationList from '../components/challenges/ParticipationList';
import FloatingQRButton from '../components/FloatingQRButton';
import RealService from '../services/RealService';

const ChallengePage = () => {
  const { id, userId } = useParams();

  const [challenge, setChallenge] = useState(null);
  const [scannedUserId, setScannedUserId] = useState(null);

  // ✅ Obtener challenge real del backend
  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const data = await RealService.getActivityById(id);
        setChallenge(data);
      } catch (err) {
        console.error("Error cargando reto:", err);
        toast.error("No se pudo cargar el reto");
      }
    };

    if (id) fetchChallenge();
  }, [id]);

  // ✅ Al escanear usuario
  const handleScan = async (scannedData) => {
    setScannedUserId(scannedData);

    try {
      const result = await RealService.checkChallenge(id, scannedData, userId);
      console.log("✅ Participación registrada:", result);

      if (result.status === "failed") {
        toast.error("Error al registrar al usuario");
      } else {
        toast.success("Participante registrado con éxito");
      }
    } catch (error) {
      console.error("❌ Error al registrar participación:", error);
      toast.error("Error al registrar al usuario");
    }
  };

  // 🔄 Mientras carga el challenge
  if (!challenge) {
    return (
      <div className="min-h-screen bg-background text-text-main flex items-center justify-center">
        <h1 className="text-xl text-secondary">Cargando reto...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-main">
      <Header userId={userId} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary mb-4">{challenge.title}</h1>
        <p className="text-lg text-text-subtle mb-10">{challenge.description}</p>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ParticipationList activityId={id} />

        </div>
      </div>

      <FloatingQRButton onScan={handleScan} />
    </div>
  );
};

export default ChallengePage;
