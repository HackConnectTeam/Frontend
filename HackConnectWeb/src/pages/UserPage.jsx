import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChallengeCardsList from '../components/challenges/ChallengeCardsList';
import Header from '../components/static/Header';
import RealService from '../services/RealService';

const UserPage = () => {
  const { userId } = useParams();
  const [qrData, setQrData] = useState('');
  const [activities, setActivities] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [userPoints, setUserPoints] = useState(0);



  useEffect(() => {
    if (userId) {
      setQrData(decodeURIComponent(userId));
    }

    // Obtain activities from backend
    const fetchActivities = async () => {
      try {
        const [activitiesData, posts, userData] = await Promise.all([
          RealService.getActivities(),
          RealService.getPosts(),
          RealService.getUser(userId)
        ]);

        const completadosPorUsuario = posts.filter(
          post => post.to_user_id === userId && post.status === 'completed'
        );

        setCompletedCount(completadosPorUsuario.length);
        setActivities(activitiesData);
        setUserPoints(userData.points || 0);
      } catch (error) {
        console.error("Error loading activities or posts:", error);
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
      <div className="w-full max-w-4xl flex items-center justify-between mb-6">
        <div className="flex-1 text-center">
          <h2 className="text-2xl font-bold text-primary">Challenge</h2>
          <p className="text-text-subtle">{completedCount} / {activities.length} retos completados</p>
        </div>
        <div className="text-right text-primary font-semibold text-lg">
          {userPoints} pts
        </div>
      </div>
      <ChallengeCardsList challenges={activities} userId={userId} />
      </main>
    </div>
  );

};

export default UserPage;
