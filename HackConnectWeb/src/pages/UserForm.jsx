import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RealService from '../services/RealService';

const UserForm = () => {
  const { userId } = useParams();

  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Cargar los tags disponibles al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Cargar tags disponibles y tags del usuario en paralelo
        const [tags, user] = await Promise.all([
          RealService.getTags(),
          userId ? RealService.getUser(userId) : Promise.resolve(null)
        ]);

        setAvailableTags(tags);

        if (user) {
          setName(user.name || '');
          setNationality(user.nationality || '');

          // Obtener tags del usuario y seleccionar los que existan en availableTags
          const userTags = await RealService.getTagsByUser(userId);
          const validTags = userTags.filter(tag =>
            tags.includes(tag)
          );
          console.log("tags", tags);
          console.log("userTags", userTags);
          console.log("validTags", validTags);
          setSelectedTags(validTags);
        }
      } catch (err) {
        setError(userId ? 'Error loading user data' : 'Error loading tags');
        console.error(err);
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
    setError(null);
    setSuccess(false);

    if (!name) {
      setError('El nombre es requerido');
      return;
    }

    try {
      setLoading(true);
      const uniqueTags = [...new Set(selectedTags)];
      await axios.patch(`http://localhost:8000/users/${userId}`, {
        name: name,
        nationality: nationality,
        tags: uniqueTags
      });
      setSuccess(true);
    } catch (err) {
      setError('Error al actualizar el usuario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-surface rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-main mb-6">Editar información de usuario</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          Usuario editado exitosamente!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-subtle mb-1">
            Nombre de usuario:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingrese el nombre"
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="nationality" className="block text-sm font-medium text-subtle mb-1">
            Nacionalidad:
          </label>
          <input
            id="nationality"
            type="text"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            placeholder="Ingresa tu nacionalidad"
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-subtle mb-2">Tags:</label>

          {loading && availableTags.length === 0 ? (
            <p className="text-subtle">Cargando tags...</p>
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
              Enviando...
            </>
          ) : 'Editar Usuario'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
