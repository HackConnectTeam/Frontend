import { useState } from 'react';
import { toast } from 'react-hot-toast';

const ImageUploader = ({ onUpload }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type.startsWith('image/')) {
      setImagePreview(URL.createObjectURL(selected));
      const formData = new FormData();
      formData.append('image', selected);
      onUpload(formData);
    } else {
      toast.error('Please select a valid image file.');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white rounded-xl shadow-md max-w-md w-full">
      <label className="cursor-pointer text-primary hover:underline">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        Select an image
      </label>

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="w-40 h-40 object-cover rounded-lg border"
        />
      )}


    </div>
  );
};

export default ImageUploader;
