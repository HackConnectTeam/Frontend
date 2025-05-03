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

  const handleScan = async (scannedData) => {
    setScannedUserId(scannedData);

    try {
      const result = await RealService.checkChallenge(id, scannedData, userId);

      if (result.status === "failed") {
        toast.error("Error when registering the user");
      } else {
        toast.success("Participant registered successfully");
      }
    } catch (error) {
      toast.error("Error when registering the user");
    }
  };

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background text-text-main flex items-center justify-center">
        <h1 className="text-xl text-secondary">Loading challenge...</h1>
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
          <ParticipationList />
        </div>
      </div>

      <FloatingQRButton onScan={handleScan} />
    </div>
  );
};

export default ChallengePage;
