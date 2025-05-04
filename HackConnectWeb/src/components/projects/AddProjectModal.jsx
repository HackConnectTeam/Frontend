import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import RealService from '../../services/RealService';
import { toast } from 'react-hot-toast';
import SelectTags from '../SelectTags';

const AddProjectModal = ({ onClose, onSuccess}) => {
  const { userId } = useParams();
  const [title, setTitle] = useState('');
  const [generated_name, setGenerateName] = useState('');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestedTitles, setSuggestedTitles] = useState([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    const loadTags = async () => {
      try {
        const data = await RealService.getTags();
      } catch {
        toast.error('Tags could not be loaded');
      }
    };

    loadTags();
  }, []);

  const handleGenerateTitle = async () => {
    try {
      const result = await RealService.generateProjectName(userId, description);
      const suggestions = [result.name1, result.name2, result.name3];
      setSuggestedTitles(suggestions);
      setGenerateName(result.name1);
      setHasGenerated(true);
    } catch (err) {
      toast.error('Title could not be generated');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const finalTitle = title.trim() || generated_name;

    if (!hasGenerated || !generated_name) {
      toast.error('Suggestions should be generated first');
      setLoading(false);
      return;
    }

    try {
      const projectData = {
        title: finalTitle,
        description_raw: description,
        generated_name: generated_name,
        user_id: userId, // reemplaza si tienes uno real
        github_url: githubUrl,
        tags,
      };

      await RealService.createProject(projectData);
      toast.success('Project created');
      onSuccess();
      onClose();
    } catch {
      toast.error('Error when creating the project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold text-primary mb-4">New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            type="text"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Generated name"
              value={generated_name}
              onChange={(e) => setGenerateName(e.target.value)}
              required
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={handleGenerateTitle}
              disabled={!description}
              className={`px-3 py-2 text-sm rounded bg-primary text-white transition ${
                !description ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'
              }`}
            >
              Generar
            </button>
          </div>

          {suggestedTitles.length > 0 && (
            <div className="mt-2 space-y-1">
              <p className="text-sm text-subtle">Suggestions</p>
              {suggestedTitles.map((name, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setTitle(name);
                    setGenerateName(name);
                  }}
                  className="block text-left w-full px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
                >
                  {name}
                </button>
              ))}
            </div>
          )}

          <input
            type="url"
            placeholder="Link to github (optional)"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <SelectTags selected={tags} onChange={setTags} disabled={loading} />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-black rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              {loading ? 'Sending...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
