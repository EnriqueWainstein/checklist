'use client';

import { useState } from 'react';
import { useCurrentUser } from '../../lib/state';
import { useDropzone } from 'react-dropzone';

export default function EditUserData() {
  const { currentUser } = useCurrentUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    avatar: ''
  });

  const [preview, setPreview] = useState(null);
  const [selected, setSelected] = useState(null);
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

  const handleSubmit = (data) => {
    console.log(data);
  }
  console.log(currentUser);

  return (
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
        {/* Nombre de la tarea */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Ingresa el nombre de la tarea"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Ingresa el nombre de la tarea"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

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