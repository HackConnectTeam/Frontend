import axios from 'axios';
import defaultAvatar from '../assets/icons/profile.svg';

const API_BASE_URL = 'https://xxx2.lamelas24.com';

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

  userExists: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/exists/${userId}`, {
        headers: {
          accept: 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error('Validation error:', error.response.data.detail);
      } else {
        console.error('Error checking if user exists:', error);
      }
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

  // Obtener el leaderboard (puntuaciones de usuarios)
  getScoreboard: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/leaderboard/`, {
        headers: {
          accept: 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener el scoreboard:', error);
      throw error;
    }
  },
  // Obtener un post por ID
  getPostById: async (postId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/post/${postId}`, {
        headers: {
          accept: 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el post ${postId}:`, error);
      throw error;
    }
  },
  getPosts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/post/`, {
        headers: { accept: 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener los posts:', error);
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

    // Subir imagen base64 al endpoint /to_mii/
  postToMii: async (userId, imageBase64) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/to_mii/`, {
        request: {
          image_base64: imageBase64
        },
        user_id: userId
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      // Return the complete response data which includes status and message
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response from server:', error.response.data);
        console.error('Status code:', error.response.status);

        // For 422 Validation Error, you might want to handle it specifically
        if (error.response.status === 422) {
          console.error('Validation errors:', error.response.data.detail);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request setup error:', error.message);
      }

      throw error;
    }
  },

// RealService.js
  getMiiAvatar: async (userId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/img_retrieval/`,
        JSON.stringify(userId+".png"), // Properly stringify the userId
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      if (response.data?.img) {
        // Check if the image is already base64 formatted
        if (response.data.img.startsWith('data:')) {
          return response.data.img;
        }
        return `data:image/png;base64,${response.data.img}`;
      }

      return defaultAvatar;

    } catch (error) {
      console.error('Error fetching Mii avatar:', error);
      return defaultAvatar;
    }
  },

  getCountries: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/countries/`, {
        headers: {
          accept: 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener países:', error);
      throw error;
    }
  },

  getProjects: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/project/`, {
        headers: { accept: 'application/json' }
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
      throw error;
    }
  },

  createProject: async (projectData) => {
    try {
      const { user_id, ...rest } = projectData;

      const response = await axios.post(
        `${API_BASE_URL}/project/?user_id=${encodeURIComponent(user_id)}`,
        rest,
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error al crear proyecto:', error);
      throw error;
    }
  },

  generateProjectName: async (userId, projectDescription) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/generate_project_names/?user_id=${encodeURIComponent(userId)}`,
        {
          project_description: projectDescription,
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error generando nombre del proyecto:', error);
      throw error;
    }
  },



};

export default RealService;
