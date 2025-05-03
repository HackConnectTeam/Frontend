import { useState } from 'react';
import { toast } from 'react-hot-toast';

const ImageUploader = ({ onUpload }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type.startsWith('image/')) {
      setFile(selected);
      setImagePreview(URL.createObjectURL(selected));
    } else {
      toast.error('Por favor, selecciona una imagen válida.');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('No hay imagen seleccionada.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      // Aquí puedes cambiar por tu endpoint real
      // const response = await axios.post('/upload', formData);
      // const imageUrl = response.data.url;
      onUpload(formData); // se pasa al padre
      toast.success('Imagen cargada con éxito');
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      toast.error('Error al subir imagen');
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
        Seleccionar imagen
      </label>

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Vista previa"
          className="w-40 h-40 object-cover rounded-lg border"
        />
      )}


    </div>
  );
};

export default ImageUploader;
