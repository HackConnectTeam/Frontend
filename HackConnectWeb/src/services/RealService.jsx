import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const RealService = {
  // Obtener todos los tags
  getTags: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tag/`, {
        params: { offset: 0, limit: 100 }
      });
      return Array.isArray(response.data)
        ? response.data.map(tag => typeof tag === 'object' ? tag.name || tag.id : tag)
        : [];
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  },

  // Obtener un usuario por ID
  getUser: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Crear un nuevo usuario
  createUser: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/`, userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Actualizar un usuario existente
  updateUser: async (id, userData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
};

export default RealService;
