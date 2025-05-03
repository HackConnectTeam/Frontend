import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChallengeCard from '../components/challenges/ChallengeCard';
import ChallengeCardsList from '../components/challenges/ChallengeCardsList';
import Header from '../components/static/Header';
import RealService from '../services/RealService';



const UserPage = () => {
  const { userId } = useParams();
  const [qrData, setQrData] = useState('');
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (userId) {
      setQrData(decodeURIComponent(userId));
    }

    // Obtener actividades del backend
    const fetchActivities = async () => {
      try {
        const data = await RealService.getActivities();
        setActivities(data); // Asume que el backend devuelve un array
      } catch (error) {
        console.error("Error cargando actividades:", error);
      }
    };

    fetchActivities();
  }, [userId]);


  useEffect(() => {
    if (userId) {
      setQrData(decodeURIComponent(userId));
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header userId={userId} />


      <main className="flex-grow flex flex-col items-center justify-center p-4 gap-6">
        <div className="bg-surface rounded-2xl shadow p-6 w-full max-w-md text-center text-text-main">
          <h2 className="text-lg font-semibold mb-4">Tu identificador es:</h2>
          <p className="text-primary font-mono bg-background p-2 rounded break-words mb-6">
            {qrData}
          </p>
        </div>

        <ChallengeCardsList challenges={activities} userId={userId} />

      </main>

      <footer className="bg-secondary text-white p-4 text-center text-sm">
        <p>Guarda este código para futuras identificaciones</p>
      </footer>
    </div>
  );
};

export default UserPage;
