import { useParams } from 'react-router-dom';
import Header from '../components/static/Header';
import Scoreboard from '../components/Scoreboard';

const ScoreboardPage = () => {
  const { userId } = useParams(); // 🔧 necesario para el Header

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header userId={userId} />

      <main className="flex-grow flex flex-col items-center justify-center p-4 gap-6">
        <Scoreboard />
      </main>
    </div>
  );
};

export default ScoreboardPage;
