import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChallengeCard from '../components/ChallengeCard';
import ChallengeCardsList from '../components/ChallengeCardsList';


const UserPage = () => {
  const { userId } = useParams();
  const [qrData, setQrData] = useState('');

  useEffect(() => {
    if (userId) {
      setQrData(decodeURIComponent(userId));
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-primary text-white p-4 shadow-md">
        <h1 className="text-xl font-bold text-center">Bienvenido a HackConnect</h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 gap-6">
        <div className="bg-surface rounded-2xl shadow p-6 w-full max-w-md text-center text-text-main">
          <h2 className="text-lg font-semibold mb-4">Tu identificador es:</h2>
          <p className="text-primary font-mono bg-background p-2 rounded break-words mb-6">
            {qrData}
          </p>
        </div>

        <ChallengeCardsList />

      </main>

      <footer className="bg-secondary text-white p-4 text-center text-sm">
        <p>Guarda este código para futuras identificaciones</p>
      </footer>
    </div>
  );
};

export default UserPage;
