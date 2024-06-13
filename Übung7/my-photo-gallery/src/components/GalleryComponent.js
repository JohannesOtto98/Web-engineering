// GalleryComponent.js
import React, { useState, useEffect } from 'react';
import { getAllPhotos, addPhoto, deletePhoto } from './api';

const GalleryComponent = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await getAllPhotos();
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handleAddPhoto = async (newPhoto) => {
    try {
      await addPhoto(newPhoto);
      fetchPhotos(); // Nach dem Hinzufügen die Fotos neu abrufen
    } catch (error) {
      console.error('Error adding photo:', error);
    }
  };

  const handleDeletePhoto = async (id) => {
    try {
      await deletePhoto(id);
      fetchPhotos(); // Nach dem Löschen die Fotos neu abrufen
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  return (
    <div>
      <h1>Photo Gallery</h1>
      <ul>
        {photos.map(photo => (
          <li key={photo.id}>
            <img src={photo.url} alt={photo.title} />
            <p>{photo.title}</p>
            <button onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.elements.title.value;
        const url = e.target.elements.url.value;
        handleAddPhoto({ title, url });
      }}>
        <input type="text" name="title" placeholder="Title" />
        <input type="text" name="url" placeholder="URL" />
        <button type="submit">Add Photo</button>
      </form>
    </div>
  );
};

export default GalleryComponent;
