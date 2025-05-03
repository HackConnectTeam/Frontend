import { useEffect, useState } from 'react';
import RealService from '../../services/RealService';

const Project = ({ title, description_raw, user_id, tags = [] }) => {

  const [userName, setUserName] = useState('Anónimo');


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (!tags || !Array.isArray(tags)) return;

        const [userData] = await Promise.all([
          RealService.getUser(user_id),

        ]);

        if (userData?.name?.trim()) {
          setUserName(userData.name);
        }

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

    </div>
  );
};

export default Project;
