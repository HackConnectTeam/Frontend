import { useEffect, useState } from 'react';
import RealService from '../services/RealService';
import { toast } from 'react-hot-toast';

const medalColors = ['text-yellow-500', 'text-gray-400', 'text-orange-500'];
const medalEmojis = ['🥇', '🥈', '🥉'];

const Scoreboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const data = await RealService.getScoreboard(); // futuro endpoint real
        const sorted = [...data].sort((a, b) => b.points - a.points);
        setUsers(sorted);
      } catch (error) {
        console.error("Error al cargar el scoreboard:", error);
        toast.error("No se pudo cargar el scoreboard");
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-4 text-text-subtle">
        Cargando puntuaciones...
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="text-center p-4 text-text-subtle">
        No hay puntuaciones disponibles.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-surface shadow rounded-xl p-6">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">🏆 Scoreboard</h2>
      <ul className="divide-y divide-gray-200">
        {users.map((user, index) => {
          const isTop3 = index < 3;
          const medal = isTop3 ? medalEmojis[index] : `${index + 1}.`;
          const textColor = isTop3 ? medalColors[index] : 'text-text-main';

          return (
            <li
              key={user.id}
              className="flex justify-between items-center py-3"
            >
              <div className="flex items-center gap-3">
                <span className={`font-semibold text-xl ${textColor}`}>
                  {medal}
                </span>
                <span className="text-text-main font-medium">{user.name?.trim() ? user.name : 'Anónimo'}</span>
              </div>
              <span className="text-primary font-mono text-lg">
                {user.total_points} pts
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Scoreboard;
