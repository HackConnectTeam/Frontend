import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

    // Obtain activities from backend
    const fetchActivities = async () => {
      try {
        const data = await RealService.getActivities();
        setActivities(data);
      } catch (error) {
        console.error("Error loading activities:", error);
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
        <ChallengeCardsList challenges={activities} userId={userId} />
      </main>
    </div>
  );
};

export default UserPage;
