import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RealService from '../services/RealService';
import ImageUploader from '../components/UploadImage';
import { toast } from 'react-hot-toast';
import Header from '../components/static/Header';
import CountrySelect from '../components/CountrySelect';
import SelectTags from '../components/SelectTags';


const UserForm = () => {
  const { userId } = useParams();

  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [tags, user] = await Promise.all([
          RealService.getTags(),
          userId ? RealService.getUser(userId) : Promise.resolve(null)
        ]);


        if (user) {
          setName(user.name || '');
          setNationality(user.nationality || '');

          const userTags = await RealService.getTagsByUser(userId);
          const validTags = userTags.filter(tag => tags.includes(tag));
          setSelectedTags(validTags);
        }
      } catch (err) {
        toast.error(userId ? 'Error loading user data' : 'Error loading tags');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleTagToggle = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const uniqueTags = [...new Set(selectedTags)];

      await RealService.updateUser(userId, {
        name,
        nationality,
        tags: uniqueTags
      });

      toast.success('User data updated successfully');
    } catch (err) {
      toast.error('Error updating user data');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (formData) => {
    try {
      console.log(formData)
      const file = formData.get('image');
      if (!file) {
        toast.error('None image selected');
        return;
      }

      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

      const base64Image = await toBase64(file);

      await RealService.postToMii(userId, base64Image);
      toast.success('Imagen enviada correctamente');

    } catch (error) {
      console.error('Error al subir imagen:', error);
      toast.error('Error al subir imagen');
    }
  };

  useEffect(() => {
    const loadTags = async () => {
      try {
        const data = await RealService.getTags();

      } catch {
        toast.error('No se pudieron cargar los tags');
      }
    };

    loadTags();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-surface rounded-lg shadow-md">
      <Header />

      <button
        onClick={() => window.history.back()}
        className="mb-4 text-sm text-primary hover:underline"
        aria-label="Back Button"
      >
        &larr; Back
      </button>
      <h2 className="text-2xl font-bold text-main mb-6">Edit user data</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <ImageUploader onUpload={handleImageUpload} />
        </div>

        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-subtle mb-1">
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Input your name"
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="nationality" className="block text-sm font-medium text-subtle mb-1">
            Nationality:
          </label>
          <CountrySelect
            value={nationality}
            onChange={setNationality}
            disabled={loading}
          />

        </div>

        <div className="mb-6">
        <SelectTags selected={tags} onChange={setTags} disabled={loading} />

        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : 'Edit user'}
        </button>
      </form>

      <div className="mt-8 pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-500">Help us improve</h3>
        <a
          href="https://tally.so/r/wayNr9"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
        >
          Share your feedback
          <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default UserForm;
