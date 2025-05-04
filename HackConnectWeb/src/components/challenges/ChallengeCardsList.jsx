<<<<<<< Updated upstream
=======
import { useEffect, useState } from 'react';
>>>>>>> Stashed changes
import ChallengeCard from './ChallengeCard';
import RealService from '../../services/RealService';

const ChallengeCardsList = ({ challenges, userId }) => {
  const [completedIds, setCompletedIds] = useState([]);

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const data = await RealService.getCompletedActivitiesByUser(userId);
        const ids = data.map(item => item.activity_id);
        setCompletedIds(ids);
      } catch (error) {
        console.log(error?.response?.status)
        if (error?.response?.status === 404) {
          // No hay retos completados: caso esperado
          setCompletedIds([]);
        } else {
          console.error('Error cargando retos completados:', error);
          toast.error('No se pudieron cargar los retos completados');
        }
      }
    };

    if (userId) fetchCompleted();
  }, [userId]);


  if (!challenges || challenges.length === 0) {
    return (
      <div className="p-6 text-center text-text-subtle">
        <p className="text-lg">There are no challenges.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6">
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          title={challenge.title}
          description={challenge.description}
          navigateTo={`/user/${encodeURIComponent(userId)}/challenge/${challenge.id}`}
          isCompleted={completedIds.includes(challenge.id)}
        />
      ))}
    </div>
  );
};

export default ChallengeCardsList;
