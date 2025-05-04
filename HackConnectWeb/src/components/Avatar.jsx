import React, { useState, useEffect } from 'react';
import RealService from '../services/RealService';
import defaultAvatar from '../assets/icons/profile.svg';

const Avatar = ({ userId, className = '' }) => {
  // const [avatar, setAvatar] = useState(defaultAvatar);
  var avatar = defaultAvatar;

  useEffect(() => {
    const fetchAvatar = async () => {
      if (userId) {
        try {
          const response = await RealService.getMiiAvatar(userId);
          // Asegúrate de que response ya incluye el prefijo base64 adecuado
          // const avatarImg = response?.startsWith('data:image') ? response : `data:image/png;base64,${response}`;
          console.log(response);
          avatar = response;
        } catch (error) {
          console.error('Error loading avatar:', error);
          avatar = defaultAvatar;
        }
      }
    };

    fetchAvatar();
  }, [userId]);

  return (
    <img
      src={avatar}
      alt="Profile"
      className={`h-6 w-6 rounded-full border border-gray-200 object-cover shadow-sm ${className}`}
      onError={(e) => {
        e.target.src = defaultAvatar;
      }}
    />
  );
};

export default Avatar;
