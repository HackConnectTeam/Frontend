import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Header from '../components/static/Header';
import FloatingQRButton from '../components/FloatingQRButton';

const ProjectsPage = () => {
  const { id, userId } = useParams();

  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
  }, []);

  const handleAdd = async () => {
  };

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background text-text-main flex items-center justify-center">
        <h1 className="text-xl text-secondary">Loading projects...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-main">
      <Header userId={userId} />

      <div className="max-w-4xl mx-auto px-4 py-12">
      </div>

      <FloatingQRButton onScan={handleAdd} />
    </div>
  );
};

export default ProjectsPage;
