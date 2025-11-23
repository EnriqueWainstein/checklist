'use client';

import { useState } from 'react';
import { useCurrentUser } from '../../lib/state';
import { useDropzone } from 'react-dropzone';
import { setCurrentUser, updateAvatar } from '@/lib/storage';
import { useRouter } from 'next/navigation';

export default function EditUserData() {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const [formData, setFormData] = useState({
    avatar: ''
  });
  const [errors, setErrors] = useState({
    avatar: ''
  });

  const [preview, setPreview] = useState(null);
  const [selected, setSelected] = useState(null);
  function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
  const onDrop = (file) => {
    const f = file[0];
    setSelected(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false, 
  });

  // Mostrar pantalla de carga si no tenemos usuario aún
  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center p-8">
          <div className="text-gray-500">Cargando usuario...</div>
        </div>
      </div>
    );
  }

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const user = await updateAvatar(await fileToBase64(selected), currentUser.id);
      setCurrentUser({
        ...currentUser, 
        avatar: user.avatar
      })
      const rolePath = currentUser.role.toLowerCase();
        rolePath === 'supervisor'
          ? router.push('/supervisor')
          : router.push('/colaborador');
    } catch(error) {
      setErrors({avatar: error.msg});
    }
  }
  
  return (
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
        {/* Nombre de la tarea */}
        <div {...getRootProps()}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Avatar
          </label>
          <input
            {...getInputProps()}
          />
          {
          isDragActive
            ? <p>Suelta la imagen aquí ...</p>
            : <p>Arrastrá una imagen o clickeá para seleccionar</p>
          }
          {preview && (<img src={preview}></img>)}
          {errors.avatar && <p className="text-red-600 text-sm mt-1">{errors.avatar}</p>}
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {'Actualizar usuario'}
          </button>
        </div>
      </form>
      </div>
  );
}