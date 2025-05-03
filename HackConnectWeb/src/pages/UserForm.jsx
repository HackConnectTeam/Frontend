import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RealService from '../services/RealService';
import toast from 'react-hot-toast';

const UserForm = () => {
  const { userId } = useParams();

  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load the available tags when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Load available tags and user tags in parallel
        const [tags, user] = await Promise.all([
          RealService.getTags(),
          userId ? RealService.getUser(userId) : Promise.resolve(null)
        ]);

        setAvailableTags(tags);

        if (user) {
          setName(user.name || '');
          setNationality(user.nationality || '');

          // Filter the tags to only include those that are in availableTags
          const userTags = await RealService.getTagsByUser(userId);
          const validTags = userTags.filter(tag =>
            tags.includes(tag)
          );
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
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uniqueTags = [...new Set(selectedTags)];

      await RealService.updateUser(userId, {
        name: name,
        nationality: nationality,
        tags: uniqueTags
      });

      toast.success("User updated successfully!");
    } catch (err) {
      toast.error("Error when updating the user data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-surface rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-main mb-6">Edit user data</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-subtle mb-1">
            Name
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
            Nacionality
          </label>
          <input
            id="nationality"
            type="text"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            placeholder="Input your nationality"
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-subtle mb-2">Tags</label>

          {loading && availableTags.length === 0 ? (
            <p className="text-subtle">Loading tags...</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {availableTags.map(tag => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <div key={tag} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`tag-${tag}`}
                      checked={isSelected}
                      onChange={() => handleTagToggle(tag)}
                      disabled={loading}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`tag-${tag}`}
                      className="ml-2 text-sm text-main"
                    >
                      {tag}
                    </label>
                  </div>
                );
              })}
            </div>
          )}
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
              Loading...
            </>
          ) : 'Edit'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
