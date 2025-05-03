import { useEffect, useState } from 'react';
import RealService from '../../services/RealService';
import { toast } from 'react-hot-toast';
import SelectTags from '../SelectTags';



const AddProjectModal = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  // const [availableTags, setAvailableTags] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTags = async () => {
      try {
        const data = await RealService.getTags();
        setAvailableTags(data);
      } catch {
        toast.error('No se pudieron cargar los tags');
      }
    };

    loadTags();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const projectData = {
        title,
        description_raw: description,
        user_id: 200, // usa el real si lo tienes
        tags,
      };
      await RealService.createProject(projectData);
      toast.success('Proyecto creado');
      onSuccess(); // notificar al padre
      onClose();
    } catch {
      toast.error('Error al crear proyecto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold text-primary mb-4">Nuevo Proyecto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <SelectTags selected={tags} onChange={setTags} disabled={loading} />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-black rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              {loading ? 'Enviando...' : 'Crear'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AddProjectModal;
