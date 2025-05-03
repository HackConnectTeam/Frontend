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
  updateUser: async (userId, userData) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Comprueba el reto
  checkChallenge: async (challengeId, scannedUserId, checkedByUserId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/check_challenge/${challengeId}`,
        {
          params: {
            tagged_user_id: scannedUserId,
            completing_user_id: checkedByUserId,
            activity_id: challengeId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error en checkChallenge:', error);
      throw error;
    }
  },

  // Obtener todas las actividades
  getActivities: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/activity/`, {
        params: { offset: 0, limit: 100 },
        headers: { accept: 'application/json' }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }
  },


  // Obtener una actividad específica por ID
  getActivityById: async (activityId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/activity/${activityId}`, {
        headers: {
          accept: 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la actividad ${activityId}:`, error);
      throw error;
    }
  },
    // Obtener todos los tags de un usuario específico
    // En tu RealService.js
  getTagsByUser: async (userId) => {
    try {
      // 1. Obtener las relaciones usuario-tag
      const response = await axios.get(`${API_BASE_URL}/user_tag/`, {
        params: {
          user_id: userId
        }
      });

      const userTagRelations = response.data || [];

      // 2. Obtener los detalles de cada tag individualmente
      const tagDetails = await Promise.all(
        userTagRelations.map(async (relation) => {
          try {
            const tagResponse = await axios.get(`${API_BASE_URL}/tag/${relation.tag_id}`);
            return tagResponse.data.name; // Devolver solo el nombre del tag
          } catch (error) {
            console.error(`Error fetching tag ${relation.tag_id}:`, error);
            return null; // O podrías devolver un valor por defecto
          }
        })
      );

      // 3. Filtrar posibles valores nulos y devolver solo los nombres válidos
      return tagDetails.filter(name => name !== null);

    } catch (error) {
      console.error(`Error getting tags for user ${userId}:`, error);
      throw error;
    }
  },
};

export default RealService;
