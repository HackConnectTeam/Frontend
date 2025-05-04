import { useState, useEffect, useParams } from 'react';
import ProjectList from '../components/projects/ProjectList';
import Header from '../components/static/Header';
import RealService from '../services/RealService';
import AddProjectModal from '../components/projects/AddProjectModal';
import toast from 'react-hot-toast';

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
            toast.error('No se pudieron cargar los proyectos');
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

            {/* Float button */}
            <button
                    onClick={() => setShowModal(true)}
                    className="fixed bottom-24 right-6 bg-primary text-white w-14 h-14 rounded-full shadow-xl hover:shadow-2xl transition-all z-30 flex items-center justify-center"
                    aria-label="Añadir proyecto"
                    style={{
                        boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

            {showModal && (
            <AddProjectModal
                onClose={() => setShowModal(false)}
                onSuccess={handleSuccess}
            />
            )}
        </main>
    </div>
  );
};

export default ProjectsPage;
