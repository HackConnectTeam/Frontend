import { useParams } from 'react-router-dom';
import ChallengeCard from './ChallengeCard';

const ChallengeCardsList = () => {
  const { userId } = useParams(); // Captura el userId actual de la URL

  const challenges = [
    {
      id: 1,
      title: "Reto de IA generativa",
      description: "Crea una app que use modelos de lenguaje para resolver un problema social."
    },
    {
      id: 2,
      title: "Hackeo ético",
      description: "Desarrolla una herramienta de análisis de seguridad para startups."
    },
    {
      id: 3,
      title: "Energía sostenible",
      description: "Prototipa una solución digital para reducir el consumo energético."
    },
    // ...
  ];

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
