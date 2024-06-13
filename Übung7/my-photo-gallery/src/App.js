import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Gallery from './components/Gallery';
import PhotoDetail from './components/PhotoDetail';
import AddPhotoForm from './components/AddPhotoForm';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const deletePhoto = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      setPhotos(photos.filter(photo => photo.id !== id));
      setSelectedPhoto(null);
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const addPhoto = async (newPhoto) => {
    try {
      await axios.post('http://localhost:3001/products', newPhoto);
      fetchPhotos();
    } catch (error) {
      console.error('Error adding photo:', error);
    }
  };

  return (
    <div>
      <h1>Photo Gallery</h1>
      {!selectedPhoto ? (
        <>
          <Gallery photos={photos} onPhotoClick={setSelectedPhoto} />
          <AddPhotoForm onAddPhoto={addPhoto} />
        </>
      ) : (
        <PhotoDetail photo={selectedPhoto} onDelete={deletePhoto} onBack={() => setSelectedPhoto(null)} />
      )}
    </div>
  );
};

export default App;
