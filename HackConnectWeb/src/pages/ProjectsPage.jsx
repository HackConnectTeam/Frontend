import { useState, useEffect } from 'react';
import ProjectList from '../components/projects/ProjectList';
import Header from '../components/static/Header';
import RealService from '../services/RealService';
import AddProjectModal from '../components/projects/AddProjectModal';

const ProjectsPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProjects = async () => {
          try {
            const data = await RealService.getProjects();
            setProjects(data);
          } catch (err) {
            console.error('Error cargando proyectos:', err);
          } finally {
            setLoading(false);
          }
        };

        fetchProjects();
      }, []);
      const handleSuccess = async () => {
        const data = await RealService.getProjects();
        setProjects(data);
      };



  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col">
        <Header />

        <main className="flex-grow p-6 relative">
            <h1 className="text-3xl font-bold text-primary text-center mb-8">
            Proyectos del Hackathon
            </h1>

            <ProjectList projects={projects} loading={loading} />

            {/* Botón flotante */}
            <button
            onClick={() => setShowModal(true)}
            className="fixed bottom-6 right-6 bg-primary text-white w-14 h-14 rounded-full shadow-lg text-3xl flex items-center justify-center hover:bg-primary/90 transition z-40"
            aria-label="Añadir proyecto"
            >
            +
            </button>

            {showModal && (
            <AddProjectModal
                onClose={() => setShowModal(false)}
                onSuccess={handleSuccess}
            />
            )}
        </main>

        <footer className="bg-secondary text-white p-4 text-center text-sm">
            <p>HackUPC 2025</p>
        </footer>
    </div>
  );
};

export default ProjectsPage;
