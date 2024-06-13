import React from 'react';

const Gallery = ({ photos, onPhotoClick }) => {
  return (
    <div className="gallery">
      {photos.map(photo => (
        <div key={photo.id} className="gallery-item" onClick={() => onPhotoClick(photo)}>
          <img src={photo.image} alt={photo.title} />
          <p>{photo.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
