import { useEffect, useState } from 'react';
import Participation from './Participation';
import RealService from '../../services/RealService';
import { toast } from 'react-hot-toast';

const ParticipationList = ({ activityId }) => {
  const [participations, setParticipations] = useState([]);

  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        const posts = await RealService.getPosts();

        // Filter by current challenge and status 'completed'
        const filtered = posts.filter(
          (post) =>
            post.activity_id === parseInt(activityId) &&
            post.status === 'completed'
        );

        const results = await Promise.all(
          filtered.map(async (post) => {
            const user = await RealService.getUser(post.to_user_id);
            return {
              id: post.id,
              userName: user?.name?.trim() || 'Anonimous',
              userImage: user?.profile_image || '/placeholder-user.png',
            };
          })
        );

        setParticipations(results);
      } catch (err) {
        toast.error('Participations could not be loaded');
      }
    };

    fetchParticipations();
  }, [activityId]);

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6">
      {participations.map((item) => (
        <Participation
          key={item.id}
          userName={item.userName}
          userImage={item.userImage}
        />
      ))}
    </div>
  );
};

export default ParticipationList;
