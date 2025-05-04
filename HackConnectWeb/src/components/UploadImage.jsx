import React, { useState, useEffect } from 'react';
import RealService from '../services/RealService';
import defaultAvatar from '../assets/icons/profile.svg';
import { toast } from 'react-hot-toast';

const Avatar = ({ userId, className = '' }) => {
  const [avatar, setAvatar] = useState(defaultAvatar);

  useEffect(() => {
    const fetchAvatar = async () => {
      if (!userId) {
        setAvatar(defaultAvatar);
        return;
      }

      try {
        const response = await RealService.getMiiAvatar(userId);

        // Handle different response formats
        let imageData = response;

        if (!imageData) {
          throw new Error('No image data received');
        }

        // Create a blob URL if we have base64 data
        if (typeof imageData === 'string') {
          let blobUrl;

          if (imageData.startsWith('data:image/')) {
            // If it's already a data URL
            const blob = await fetch(imageData).then(res => res.blob());
            blobUrl = URL.createObjectURL(blob);
          } else {
            // If it's raw base64
            const byteString = atob(imageData);
            const mimeType = 'image/png'; // or detect from response
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);

            for (let i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
            }

            const blob = new Blob([ab], { type: mimeType });
            blobUrl = URL.createObjectURL(blob);
          }

          console.log(blobUrl);
          setAvatar(blobUrl);
          return () => URL.revokeObjectURL(blobUrl); // Clean up
        }

      } catch (error) {
        console.error('Error loading avatar:', error);
        toast.error('Error loading avatar image');
        setAvatar(defaultAvatar);
      }
    };

    fetchAvatar();
  }, [userId]);

  return (
    <img
      src={avatar}
      alt="User Avatar"
      className={`h-6 w-6 rounded-full border border-gray-200 object-cover shadow-sm ${className}`}
      onError={(e) => {
        console.warn('Avatar image failed to load, using fallback');
        e.target.src = defaultAvatar;
        setAvatar(defaultAvatar);
      }}
    />
  );
};

export default Avatar;
