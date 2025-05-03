import { useEffect, useState } from 'react';
import Participation from './Participation';
import RealService from '../../services/RealService';
import { toast } from 'react-hot-toast';

const postIds = [1, 2, 3];

const ParticipationList = () => {
  const [participations, setParticipations] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const results = await Promise.all(
          postIds.map((id) => RealService.getPostById(id))
        );
        setParticipations(results);
      } catch (err) {
        console.error("Error cargando participaciones:", err);
        toast.error("No se pudieron cargar las participaciones");
      }
    };

    fetchAllPosts();
  }, []);

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6">
      {participations.map((post) => (
        <Participation
          key={post.id}
          userName={post.user?.name || "Anónimo"}
          userImage={post.user?.profile_image || "/placeholder-user.png"}
          challengeImage={post.activity?.image || "/placeholder-challenge.jpg"}
        />
      ))}
    </div>
  );
};

export default ParticipationList;
