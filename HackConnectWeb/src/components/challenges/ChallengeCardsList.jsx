import { useParams } from 'react-router-dom';
import ChallengeCard from './ChallengeCard';

const ChallengeCardsList = ({ challenges, userId }) => {
  if (!challenges || challenges.length === 0) {
    return (
      <div className="p-6 text-center text-text-subtle">
        <p className="text-lg">Lista de retos vacía</p>
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
        />
      ))}
    </div>
  );
};

export default ChallengeCardsList;
