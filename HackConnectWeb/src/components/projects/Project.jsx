import { useEffect, useState } from 'react';
import RealService from '../../services/RealService';

const Project = ({ title, description_raw, user_id, tags = [] }) => {

  const [userName, setUserName] = useState('Anónimo');
  const [tagNames, setTagNames] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (!tags || !Array.isArray(tags)) return;

        const [userData, allTags] = await Promise.all([
          RealService.getUser(user_id),
          RealService.getTags()
        ]);

        if (userData?.name?.trim()) {
          setUserName(userData.name);
        }

        const validTagNames = tags
          .map(tagId => allTags.find(tag => tag.id === tagId || tag === tagId))
          .filter(Boolean);

        setTagNames(validTagNames.map(tag => tag.name || tag));
      } catch (err) {
        console.error('Error cargando detalles del proyecto:', err);
      }
    };

    fetchDetails();
  }, [user_id, tags]);

  return (
    <div className="bg-surface p-6 rounded-xl shadow-md max-w-2xl w-full mx-auto">
      <h2 className="text-2xl font-bold text-primary mb-2">{title}</h2>
      <p className="text-text-subtle mb-4">{description_raw}</p>

      <div className="text-sm text-text-main mb-2">
        <span className="font-semibold">Autor:</span> {userName}
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {tagNames.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Project;
