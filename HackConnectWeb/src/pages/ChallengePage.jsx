import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


const ChallengePage = () => {
  const { userId } = useParams();
  const [qrData, setQrData] = useState('');
  const { id } = useParams();

  useEffect(() => {
    if (userId) {
      setQrData(decodeURIComponent(userId));
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-background text-text-main flex items-center justify-center">
      <h1 className="text-2xl font-bold">
        Página del reto #{id} — próximamente disponible
      </h1>
    </div>
  );
};

export default ChallengePage;
