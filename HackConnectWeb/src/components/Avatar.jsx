
import React, { useState, useEffect } from 'react';
import RealService from '../services/RealService';
import defaultAvatar from '../assets/icons/profile.svg';

const Avatar = ({ userId, className = '' }) => {
  const [avatar, setAvatar] = useState(defaultAvatar);

  useEffect(() => {
    const fetchAvatar = async () => {
      if (userId) {
        try {
          const avatarImg = await RealService.getMiiAvatar(userId);
          setAvatar(avatarImg || defaultAvatar);
        } catch (error) {
          console.error('Error loading avatar:', error);
          setAvatar(defaultAvatar);
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
