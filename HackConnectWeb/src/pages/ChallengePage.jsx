import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import Header from '../components/static/Header';

const ChallengePage = () => {
  const { id } = useParams();
  const { userId } = useParams();

  const challenges = useMemo(() => [
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
  ], []);

  const challenge = challenges.find(c => c.id === parseInt(id));

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background text-text-main flex items-center justify-center">
        <h1 className="text-xl text-secondary">Reto no encontrado</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-main">
      <Header userId={userId} />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary mb-4">{challenge.title}</h1>
        <p className="text-lg text-text-subtle mb-10">{challenge.description}</p>

        {/* Aquí vendrá la futura lista de tarjetas */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Por ejemplo: <SubtaskCard /> */}
        </div>
      </div>
    </div>
  );
};

export default ChallengePage;
