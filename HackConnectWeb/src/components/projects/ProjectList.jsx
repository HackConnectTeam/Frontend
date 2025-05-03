import { useEffect, useState } from 'react';
import Project from './Project';
import RealService from '../../services/RealService';
import { toast } from 'react-hot-toast';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await RealService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error cargando proyectos:', error);
        toast.error('No se pudieron cargar los proyectos');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-text-subtle p-6">
        Cargando proyectos...
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="text-center text-text-subtle p-6">
        No hay proyectos disponibles.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 items-center">
      {projects.map((project) => (
        <Project key={project.id} {...{ ...project, tags: project.tags || [] }} />
      ))}
    </div>
  );
};

export default ProjectList;
